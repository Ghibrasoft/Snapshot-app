import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { auth } from '../firebase';
import { FcGoogle } from 'react-icons/fc'

export function GoogleLogin() {
    const [loading, setLoading] = useState(false);

    function signInWithGoogle() {
        setLoading(true);

        signInWithPopup(auth, new GoogleAuthProvider())
            .then(() => { setLoading(true) })
            .catch(() => { setLoading(false) })
    }
    return (
        <Button variant='outline-primary' disabled={loading} onClick={() => signInWithGoogle()}>
            <div className='d-flex justify-content-center align-items-center'>
                <FcGoogle />oogle Log in
                {loading && <span><Spinner variant='primary' animation='border' /></span>}
            </div>
        </Button>
    )
}
