import React, { useState } from "react";
import { storage } from "../../firebase/firebase"; // تأكد من مسار الاستيراد الصحيح
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!image) return alert("اختر صورة أولاً");

    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error("خطأ في الرفع:", error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setImageUrl(url);
      }
    );
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md text-center">
      <input type="file" onChange={handleImageChange} className="mb-2" />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        رفع الصورة
      </button>
      <div className="mt-2">
        {progress > 0 && <p>التقدم: {progress.toFixed(2)}%</p>}
        {imageUrl && (
          <div className="mt-2">
            <p>تم الرفع بنجاح:</p>
            <img src={imageUrl} alt="Uploaded" className="mt-2 w-40 h-40 object-cover" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
