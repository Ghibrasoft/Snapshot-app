import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { RiDeleteBinLine } from 'react-icons/ri'
import { db, storage } from '../firebase';



type deleteSnapType = {
    id: string;
    imageURL: any;
}

export function DeleteSnap({ id, imageURL }: deleteSnapType) {

    async function handleDelete() {
        if (window.confirm('Confirm deleting article'))
            try {
                await deleteDoc(doc(db, 'Snaps', id))
                const storageRef = ref(storage, imageURL);
                await deleteObject(storageRef);
            }
            catch (error) {
                console.log(error);
            }
    }

    return (
        <span style={{
            cursor: 'pointer',
            fontSize: '1.3rem'
        }}
            onClick={handleDelete}>
            <RiDeleteBinLine className='text-danger' />
        </span>
    )
}
