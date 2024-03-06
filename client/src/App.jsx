import React, { useEffect, useState } from "react";
import axios from "axios";

function Upload({ setImgId }) {
  const [file, setFile] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    const res = await axios.post("http://localhost:5000/upload", formData);
    setImgId(res.data);
  };

  return (
    <form onSubmit={submit}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Upload</button>
    </form>
  );
}

function Image({ id }) {
  const [src, setSrc] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      const res = await axios.get(`http://localhost:5000/image/${id}`);
      setSrc(`data:image/jpeg;base64,${res.data}`);
    };
    fetchImage();
  }, [id]);

  return <img src={src} alt="" />;
}

function App() {
  const [imgId, setImgId] = useState(null);

  return (
    <div>
      <Upload setImgId={setImgId} />
      {imgId && <Image id={imgId} />}
    </div>
  );
}

export default App;
