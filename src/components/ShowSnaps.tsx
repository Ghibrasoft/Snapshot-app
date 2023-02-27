import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Card, Col, Form, Row, Stack } from 'react-bootstrap'
import { useAuthState } from 'react-firebase-hooks/auth'
import { AddSnaps } from './AddSnaps'
import { DownloadSnap } from './DownloadSnap'
import { LikeSnap } from './LikeSnap'
import { auth, db } from '../firebase'
import { DeleteSnap } from './DeleteSnap'
import Moment from 'react-moment'


export function ShowSnaps() {
    const [user] = useAuthState(auth);
    const [imgList, setImgList] = useState<any[]>([]);
    const [word, setWord] = useState('');

    useEffect(() => {
        const snapRef = collection(db, 'Snaps');
        const q = query(snapRef, orderBy('createdAt', 'desc'));

        onSnapshot(q, (snapshot) => {
            const snaps = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setImgList(snaps);
        });
    }, []);


    return (
        <div>

            {/* quantity of total snapshots */}
            <h5>{imgList.length} snapshot(s)</h5>
            <hr />

            {/* search bar and upload button */}
            <Stack direction='horizontal' gap={3} className='d-flex align-items-center justify-content-center'>
                <Form.Group className='form-floating'>
                    <Form.Control className='me-auto' type='text' id='find-snap' placeholder=' ' onChange={(e) => setWord(e.target.value)} />
                    <Form.Label htmlFor='find-snap'>Search snap...</Form.Label>
                </Form.Group>
                <div className='vr'></div>
                {/* adding snapshots component */}
                <AddSnaps />
            </Stack>

            {/* displaying snapshots list  */}
            <Row className='row-cols-3'>
                {
                    imgList.filter(({ title }) => (title.toLocaleLowerCase().includes(word)))
                    .map(({ id, userId, title, imageURL, createdAt, likes }) => (
                        <Col key={id} className='g-3 col-12 col-md-6 col-lg-3'>
                            <Card className='p-3 shadow'>
                                <Card.Title className='text-center'>{title}</Card.Title>
                                <Card.Img alt={title} src={imageURL} style={{ width: '100%', height: '250px', objectFit: 'cover' }} className='' />
                                <Card.Footer>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <span className='d-flex justify-content-center align-items-center'>
                                            {user && <LikeSnap id={id} likes={likes} />}
                                            <small className='ms-1'>
                                                {`${likes.length} like(s)`}
                                            </small>
                                        </span>
                                        <DownloadSnap id={id} imageURL={imageURL} />
                                        {user && user.uid === userId && (
                                            <DeleteSnap id={id} imageURL={imageURL} />
                                        )}
                                    </div>
                                </Card.Footer>
                                {
                                    <span className='d-flex justify-content-between'>
                                        {createdAt.toDate().toDateString()}
                                        <Moment fromNow>{createdAt.toDate()}</Moment>
                                    </span>
                                }
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </div>
    )
}
