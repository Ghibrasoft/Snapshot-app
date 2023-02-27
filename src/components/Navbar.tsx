import { Container, Nav, Navbar as NavbarBs } from 'react-bootstrap'
import { GoogleLogin } from './GoogleLogin'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Avatar } from './Avatar';
import { FcPicture } from 'react-icons/fc';



export function Navbar() {
    const [user] = useAuthState(auth);
    return (
        <NavbarBs sticky='top' className='bg-white shadow-sm mb-3'>
            <Container>
                <h1>
                    <a href='/'
                        style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <FcPicture />
                        Snapshot
                    </a>
                </h1>
                <Nav className='ms-auto'>
                    {!user ? <GoogleLogin /> : <Avatar />}
                </Nav>
            </Container>
        </NavbarBs>
    )
}
