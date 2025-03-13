import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // تأكد من استيراد Firestore

const DisplayImages = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const querySnapshot = await getDocs(collection(db, "images"));
      setImages(querySnapshot.docs.map(doc => doc.data().url));
    };
    fetchImages();
  }, []);

  return (
    <div>
      {images.map((img, index) => (
        <img key={index} src={img} alt="Uploaded" width="200" />
      ))}
    </div>
  );
};

export default DisplayImages;
