import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useRef, useState } from 'react'
import { Button, Form, Stack } from 'react-bootstrap'
import { auth, db, storage } from '../firebase';
import { FcAddImage } from 'react-icons/fc';
import { FiUploadCloud } from 'react-icons/fi';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';


type formDataType = {
    title: string;
    imageURL: any;
    createdAt: Date;
}

export function AddSnaps() {
    const [user] = useAuthState(auth);
    const [formData, setFormData] = useState<formDataType>({
        title: '',
        imageURL: '',
        createdAt: Timestamp.now().toDate()
    })   // form data 
    const [progress, setProgress] = useState(0);   // for progress bar percentage
    const titleRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLInputElement>(null);

    // form submit
    function handleUploadSubmit(e: React.FormEvent) {
        e.preventDefault();

        const storageRef = ref(storage, `/images/${Date.now()}${formData.imageURL.name}`);
        const uploadImg = uploadBytesResumable(storageRef, formData.imageURL);

        uploadImg.on('state_changed', (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(progress);
        },
            (error) => {
                console.log(error);
            },
            () => {
                setFormData({
                    title: '',
                    imageURL: '',
                    createdAt: Timestamp.now().toDate()
                });

                getDownloadURL(uploadImg.snapshot.ref)
                    .then((url) => {
                        const snapRef = collection(db, 'Snaps');

                        addDoc(snapRef, {
                            title: formData.title,
                            imageURL: url,
                            createdAt: Timestamp.now().toDate(),
                            userId: user?.uid,
                            likes: []
                        })
                            .then(() => {
                                setProgress(0);
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    });
            }
        )
    }

    // open attach file input 
    function openAttachHandler() {
        imageRef.current?.click();
    }

    // attach image  
    function attachHandler() {
        setFormData({ ...formData, imageURL: imageRef.current?.files?.[0] });
    }

    return (
        <div>
            <div>
                {
                    progress === 0 ?
                        null
                        :
                        <div role='progressbar' className='progress progress-bar-striped progress-bar-animated' style={{ height: '20px', width: `${progress}%` }}>
                            <span className='d-flex justify-content-center align-items-center w-100'>
                                {`Uploading ${progress}%`}
                            </span>
                        </div>
                }
            </div>
            <Stack direction='horizontal' gap={3} className='d-flex align-items-center justify-content-center'>

                {/* dropdown form for upload image */}
                <div className='dropdown'>
                    <Button
                        variant={`${user ? 'outline-primary' : 'secondary'}`}
                        className="dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        data-bs-auto-close="outside"
                        disabled={!user}
                    >
                        {
                            user ? 'Upload your snapshot' : 'Log in for upload'
                        }
                    </Button>
                    <Form className="dropdown-menu p-3" onSubmit={handleUploadSubmit}>
                        <Stack gap={3}>
                            <Form.Group controlId='title'>
                                <Form.Control type="text"
                                    name="title"
                                    value={formData.title}
                                    ref={titleRef}
                                    placeholder="Title..."
                                    required
                                    onChange={(e) => { setFormData({ ...formData, [e.target.name]: titleRef.current!.value }) }}
                                />
                            </Form.Group>

                            {/* replacing normal input file to custom input file */}
                            <Form.Group controlId=''>
                                <Form.Control type="file" name="imageURL" accept='image/*' required
                                    ref={imageRef}
                                    style={{ display: 'none' }}
                                    onChange={attachHandler}
                                />
                                <span
                                    style={{ cursor: 'pointer' }}
                                    className='d-flex flex-column justify-content-center align-items-center bg-light border rounded'
                                    onClick={openAttachHandler}
                                >
                                    <FcAddImage fontSize='2rem' /> Choose image
                                </span>
                            </Form.Group>
                            <Button type="submit" variant='outline-primary'>
                                <span>Upload </span>
                                <FiUploadCloud fontSize='1.5rem' />
                            </Button>
                        </Stack>
                    </Form>
                </div>
            </Stack>
        </div>
    )
}
