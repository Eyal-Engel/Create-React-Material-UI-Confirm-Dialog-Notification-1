import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import './AudioUploader.css';


const AudioUploader = () => {
  const [files, setFiles] = useState([]);

  const onDrop = acceptedFiles => {
    // filter only audio files
    const filteredFiles = acceptedFiles.filter(file => file.type.startsWith("audio/"));
    if (filteredFiles.length === 0) {
        alert("Only audio files are accepted!")
    } else {
        setFiles(filteredFiles);
    }
  };

  const { getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "audio/*"
  });

  
  const clearFiles = e => {
    e.preventDefault();
    setFiles([]);
  };

  const filePreview = files.map((file, index) => {
    return (
      <div key={index} style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
      <audio key={index} controls src={URL.createObjectURL(file)} style={{width: "200px"}} />
      <button onClick={clearFiles} style={{width: "25px", height: "25px"}}>X</button>
      </div>

    );
  });

  return (
    <div style={{ border: "1px solid grey", padding: "20px", backgroundColor: "none", width: "550px"  }}>
      <input {...getInputProps()} id="fileInputAudio" style={{display: "none"}} />
      {isDragActive ? (
        <h5>Drop the audio  here ...</h5>
      ) : (
        <div className="textAreaDragNDrop" style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
          <p>Drag and drop an audio here or </p>
          <p><a onClick={() => {document.getElementById("fileInputAudio").click()}}>Click here</a></p>
          <p>to select a file from file explorer</p>
        </div>
      )}
      <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>{filePreview}</div>
    </div>
  );
};

export default AudioUploader;
