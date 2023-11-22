import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    useDisclosure,
} from "@nextui-org/react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CMSAddModal({ sectionTitle }) {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [backdrop, setBackdrop] = useState("blur");

    backdrop;
    const handleOpen = (backdrop) => {
        setBackdrop(backdrop);
        onOpen();
    };

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (!form.email || !form.password)
            return alert("Please enter a valid email and password!");
        //imported now-expects object as argument
        signInUser(form)
            .then((userData) => {
                let test = userData;
                if (userData.length) {
                    setUser(userData);
                } else {
                    setUser(false);
                }
                return test;
                // userData.length ? setUser(userData) : setUser(false);
            })
            .then((test) => {
                if (!test.length) return alert("Invalid email or password!");
                setForm({
                    email: "",
                    password: "",
                });
                navigate("/");
                onOpenChange();
            })
            .catch((error) => console.error(error));
    };

    return (
        <>
            <div onClick={() => handleOpen(`blur`)}>Add new thing</div>
            <Modal
                isOpen={isOpen}
                backdrop="blur"
                onOpenChange={onOpenChange}
                placement="top-center"
                // className={isDarkMode && "dark text-foreground"}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Add to {sectionTitle}
                            </ModalHeader>
                            <ModalBody>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSubmit();
                                    }}
                                    autoComplete="off"
                                >
                                    <Input
                                        isRequired
                                        autoFocus
                                        placeholder="Enter your email"
                                        label="Email"
                                        name="email"
                                        type="email"
                                        variant="bordered"
                                        // isInvalid={
                                        //     !form.email ? true : isInvalid
                                        // }
                                        // color={isInvalid ? "danger" : "success"}
                                        // errorMessage={
                                        //     isInvalid &&
                                        //     "Please enter a valid email"
                                        // }
                                        value={form.email}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        isRequired
                                        placeholder="Enter your password"
                                        label="Password"
                                        name="password"
                                        variant="bordered"
                                        value={form.password}
                                        onChange={handleChange}
                                    />
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="flat"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button color="primary" onPress={handleSubmit}>
                                    Sign in
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
