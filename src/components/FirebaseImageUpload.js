import React, { useEffect, useState } from "react";
import { imageDb } from '../firebase/FirebaseConfig'; // Adjust path as needed
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

function FirebaseImageUpload() {
    const [img, setImg] = useState(null);
    const [imgUrl, setImgUrl] = useState([]);

    const handleClick = () => {
        if (img !== null) {
            const imgRef = ref(imageDb, `files/${v4()}`);
            uploadBytes(imgRef, img)
                .then(value => getDownloadURL(value.ref))
                .then(url => {
                    setImgUrl(prevUrls => [...prevUrls, url]);
                })
                .catch(error => console.error('Upload failed:', error));
        }
    };

    useEffect(() => {
        listAll(ref(imageDb, "files"))
            .then(imgs => {
                const promises = imgs.items.map(val => getDownloadURL(val));
                return Promise.all(promises);
            })
            .then(urls => setImgUrl(urls))
            .catch(error => console.error('Failed to fetch images:', error));
    }, []);

    return (
        <div className="App">
            <input type="file" onChange={(e) => setImg(e.target.files[0])} />
            <button onClick={handleClick}>Upload</button>
            <br />
            {imgUrl.map((url, index) => (
                <div key={index}>
                    <img src={url} height="200px" width="200px" alt={`Uploaded ${index}`} />
                    <br />
                </div>
            ))}
        </div>
    );
}

export default FirebaseImageUpload;
