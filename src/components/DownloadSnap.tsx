import { GrDownload } from 'react-icons/gr';


type downloadSnapType = {
    id: string;
    imageURL: string;
}
export function DownloadSnap({ imageURL }: downloadSnapType) {

    return (
        <div>
            <a href={imageURL} download>
                <GrDownload style={{ cursor: 'pointer' }} />
            </a>
        </div>
    )
}
