const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;
import axios from "axios";

const baseUrl = `https://api.cloudinary.com/v1_1/${cloudName}`;

const makeUploadRequest = async ({
    file,
    fieldName,
    progressCallback,
    successCallback,
    errorCallback,
}) => {
    try {
        const url = `${baseUrl}/image/upload`;

        const formData = new FormData();
        formData.append(fieldName, file);
        formData.append("upload_preset", uploadPreset);

        const request = new XMLHttpRequest();
        request.open("POST", url);

        request.upload.onprogress = (e) => {
            progressCallback(e.lengthComputable, e.loaded, e.total);
        };
        let usableUrl = "a url";
        request.onload = async () => {
            if (request.status >= 200 && request.status < 300) {
                const { delete_token: deleteToken, secure_url: secureUrl } =
                    await JSON.parse(request.response);
                successCallback(deleteToken);
                // console.log(secureUrl);
                setUrl(secureUrl);
                usableUrl = secureUrl;
            } else {
                errorCallback(request.responseText);
            }
        };

        request.send(formData);

        return {
            abortRequest: () => {
                request.abort();
            },
            usableUrl,
        };
    } catch (error) {
        console.error(error);
    }
};

const makeDeleteRequest = ({ token, successCallback, errorCallback }) => {
    const url = `${baseUrl}/delete_by_token`;

    const request = new XMLHttpRequest();
    request.open("POST", url);

    request.setRequestHeader("Content-Type", "application/json");

    request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
            successCallback();
        } else {
            errorCallback(request.responseText);
        }
    };
    request.send(JSON.stringify({ token }));
};

export { cloudName, uploadPreset, makeUploadRequest, makeDeleteRequest };
