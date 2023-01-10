import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const ImageUploader = () => {
  const [files, setFiles] = useState([]);

  const onDrop = acceptedFiles => {
    // filter only image files
    const filteredFiles = acceptedFiles.filter(file => file.type.startsWith("image/"));
    if (filteredFiles.length === 0) {
        alert("Only image files are accepted!")
    } else {
        setFiles(filteredFiles);
    }
  };

  const { getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*"
  });

  const clearFiles = e => {
    e.preventDefault();
    setFiles([]);
  };

  const filePreview = files.map((file, index) => {
    return (
      <div key={index}>
        <img src={URL.createObjectURL(file)} style={{width: "200px"}} />
        <button onClick={clearFiles}>X</button>
      </div>
    );
  });

  return (
    <div style={{ border: "1px solid grey", padding: "20px", backgroundColor: "none", width: "550Px"  }}>
      <input {...getInputProps()} id="fileInputImage" style={{display: "none"}} />
      {isDragActive ? (
        <p>Drop the image  here ...</p>
      ) : (
        <div className="textAreaDragNDrop" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
          <p>Drag and drop an image here or </p>
          <p><a onClick={() => {document.getElementById("fileInputImage").click()}}>Click here</a></p>
          <p>to select a file from file explorer</p>
        </div>
      )}
      <div style={{    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    }}>{filePreview}</div>
    </div>
  );
};

export default ImageUploader;
