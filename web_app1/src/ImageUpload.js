import React from 'react';
  
  const ImageUpload = () =>  {
	return (
	  <div>
	  </div>
	);
  }
  
  export default ImageUpload;
  import React, { useState } from 'react';
import { storage } from './firebase.config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function MyComponent() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(storageRef);
    setImageUrl(downloadURL);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
    </div>
  );
}

export { MyComponent };
