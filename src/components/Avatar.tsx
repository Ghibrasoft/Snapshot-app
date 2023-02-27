import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { Logout } from './Logout'



export function Avatar() {
    const avatar: any = auth.currentUser?.photoURL;
    return (
        <div className="dropdown">
            <div className="dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                <img alt='avatar' src={avatar} className='rounded-circle' height={30} width={30} />
            </div>

            <ul className="dropdown-menu dropdown-menu-end p-3" aria-labelledby="dropdownMenuLink">
                <li>
                    <Link to={`/userprofile`} style={{textDecoration: 'none', color: 'inherit'}}>
                        Your profile
                    </Link>
                </li>
                <hr />
                <li><Logout /></li>
            </ul>
        </div>
    )
}
