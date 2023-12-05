import { useState } from "react";

import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";

import {
    // makeDeleteRequest,
    cloudName,
    uploadPreset,
    // makeUploadRequest
} from "../../lib/cloudinary";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
const baseUrl = `https://api.cloudinary.com/v1_1/${cloudName}`;

export default function CloudinaryTest({ setUrl, i }) {
    const [files, setFiles] = useState([]);
    // const [value, setValue] = useState("");
    // const [url, setUrl] = useState("");
    const makeUploadRequest = ({
        file,
        fieldName,
        progressCallback,
        successCallback,
        errorCallback,
        // setUrl,
    }) => {
        const url = `${baseUrl}/image/upload`;

        const formData = new FormData();
        formData.append(fieldName, file);
        formData.append("upload_preset", uploadPreset);

        const request = new XMLHttpRequest();
        request.open("POST", url);

        request.upload.onprogress = (e) => {
            progressCallback(e.lengthComputable, e.loaded, e.total);
        };
        // let usableUrl = "a url";
        request.onload = async () => {
            if (request.status >= 200 && request.status < 300) {
                const { delete_token: deleteToken, secure_url: secureUrl } =
                    await JSON.parse(request.response);
                successCallback(deleteToken);
                // console.log(secureUrl);
                setUrl(secureUrl, i);
                // setValue(secureUrl);
                // usableUrl = secureUrl;
            } else {
                errorCallback(request.responseText);
            }
        };

        request.send(formData);

        return () => {
            request.abort();
        };
    };
    const makeDeleteRequest = ({ token, successCallback, errorCallback }) => {
        const url = `${baseUrl}/delete_by_token`;

        const request = new XMLHttpRequest();
        request.open("POST", url);

        request.setRequestHeader("Content-Type", "application/json");

        setUrl("", i);
        request.onload = () => {
            if (request.status >= 200 && request.status < 300) {
                successCallback();
            } else {
                errorCallback(request.responseText);
            }
        };
        request.send(JSON.stringify({ token }));
    };

    const revert = (token, successCallback, errorCallback) => {
        makeDeleteRequest({
            token,
            successCallback,
            errorCallback,
        });
    };

    const process = async (
        fieldName,
        file,
        metadata,
        load,
        error,
        progress,
        abort,
        transfer,
        options,
        setUrl
    ) => {
        const { abortRequest, usableUrl } = await makeUploadRequest({
            file,
            fieldName,
            successCallback: load,
            errorCallback: error,
            progressCallback: progress,
            setUrl: setUrl,
        });
        usableUrl && console.log("from react", usableUrl);
        console.log(abortRequest);

        return {
            abort: () => {
                abortRequest();
                abort();
            },
        };
    };
    // console.log(url);
    return (
        <div
            className="w-4/5 pt-2"
            // style={{ width: "80%", margin: "auto", padding: "1%" }}
        >
            {/* <Input value={value} /> */}
            <FilePond
                files={files}
                acceptedFileTypes="image/*"
                onupdatefiles={setFiles}
                allowMultiple={true}
                server={{ process, revert }}
                name="file"
                setUrl={setUrl}
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />
        </div>
    );
}
