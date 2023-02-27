import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { BsHeartFill } from 'react-icons/bs';
import { BsHeart } from 'react-icons/bs'


type likeSnapType = {
    id: string;
    likes: string;
}
export function LikeSnap({ id, likes }: likeSnapType) {
    const [user] = useAuthState(auth);
    const likesRef = doc(db, 'Snaps', id);

    function handleLike() {
        if (user && likes?.includes(user.uid)) {
            updateDoc(likesRef, {
                likes: arrayRemove(user.uid)
            })
                .then(() => {
                    console.log('unliked');
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            updateDoc(likesRef, {
                likes: arrayUnion(user!.uid)
            })
                .then(() => {
                    console.log('liked');
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    return (
        <div>
            {
                user && likes?.includes(user.uid) ? (
                    <BsHeartFill cursor='pointer' color='red' onClick={handleLike} />
                )
                    :
                    (
                        <BsHeart cursor='pointer' onClick={handleLike} />
                    )
            }
        </div>
    )
}
