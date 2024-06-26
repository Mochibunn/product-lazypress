import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    useDisclosure,
} from '@nextui-org/react';
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/animations/Loading_animation.json';

import { toast } from 'react-toastify';
import { useState, useMemo } from 'react';
import { deleteRecipe } from '../../lib/dbClient';
import { useAuth } from '@clerk/clerk-react';
import { useInstantSearch } from 'react-instantsearch';
import { toastError, toastSuccess, toastSaveSuccess } from '../../lib/toastify';

import { useParams } from 'react-router-dom';
import { useBlog } from '../../lib/swr';

export default function CMSDeleteModal({ clerkUserId, _id }) {
    const { blogId } = useParams();
    const { swrBlog } = useBlog(blogId);
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const { getToken } = useAuth();
    const { refresh } = useInstantSearch();

    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState('');

    const isInvalid = useMemo(() => {
        if (value === '') return false;
        return value.toUpperCase() === 'DELETE' ? false : true;
    }, [value]);

    const handleDeleteClick = async () => {
        try {
            let isValid = true;

            if (isInvalid || !value) {
                toastError(`Must type DELETE to confirm this action`);
                isValid = false;
            }
            if (!isValid) return;

            if (swrBlog.isPreview) {
                onClose();
                return toastSuccess(
                    'Operation was successful, on your website this is when the recipe would be deleted.'
                );
            }

            const sessToken = await getToken();
            const response = await deleteRecipe(sessToken, _id, clerkUserId);

            if (response?.status === 200) {
                setValue('');
                toastSaveSuccess(
                    `Recipe deleted. Click refresh if changes aren't reflected on the page`
                );
                setTimeout(() => setIsLoading(true), 750);
                setTimeout(() => onClose(), 4000);
                setTimeout(() => refresh(), 4000);
                setTimeout(() => setIsLoading(false), 4000);
            } else {
                throw new Error(
                    `Sorry, an error occurred. Please try again later.`
                );
            }
        } catch (error) {
            toastError(`${error}`);
            console.error(error);
        }

        // console.log(clerkUserId, _id);
    };

    return (
        <>
            <div onClick={() => onOpen()}>Delete Recipe</div>
            <Modal
                isOpen={isOpen}
                backdrop='blur'
                onOpenChange={onOpenChange}
                placement='top-center'
                // className={isDarkMode && "dark text-foreground"}
            >
                <ModalContent>
                    {() =>
                        isLoading ? (
                            <ModalBody className='flex justify-center items-center'>
                                <Lottie
                                    animationData={loadingAnimation}
                                    loop={true}
                                />
                            </ModalBody>
                        ) : (
                            <>
                                <ModalHeader className='flex flex-col gap-1 font-metropolis pb-0'>
                                    <p className='font-bold text-2xl text-center'>
                                        Are you sure?
                                    </p>
                                </ModalHeader>
                                <ModalBody className='pt-0'>
                                    <Input
                                        autoComplete='off'
                                        autoFocus
                                        isRequired
                                        label={
                                            <p className='inline'>
                                                Type <b>DELETE</b> to confirm.
                                                This action <i>cannot</i> be
                                                undone
                                            </p>
                                        }
                                        className='font-metropolis'
                                        // placeholder="Type DELETE to confirm"
                                        labelPlacement='outside'
                                        // color="danger"
                                        name='imgUrl'
                                        isInvalid={false}
                                        errorMessage={
                                            isInvalid &&
                                            'Type DELETE to confirm action.'
                                        }
                                        value={value}
                                        onValueChange={setValue}
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        className='font-metropolis'
                                        color='primary'
                                        variant='flat'
                                        onPress={() => {
                                            onClose();
                                            setValue('');
                                        }}
                                    >
                                        No, I want to keep it
                                    </Button>
                                    <Button
                                        className='font-metropolis shake'
                                        color='danger'
                                        onPress={handleDeleteClick}
                                    >
                                        Delete Recipe
                                    </Button>
                                </ModalFooter>
                            </>
                        )
                    }
                </ModalContent>
            </Modal>
        </>
    );
}
