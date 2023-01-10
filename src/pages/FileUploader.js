import React, { useState, useRef, useEffect } from 'react';
import "./FileUploader.css";
import { LinearProgress } from '@material-ui/core';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const FileUploader = () => {
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 100000) return alert("File size too big, upload an image less than 100kb ");
    const fileName = file.name;
    const fileExtension = fileName.split('.').pop().toLowerCase();
    if (!['gif', 'png', 'jpg', 'jpeg'].includes(fileExtension)) {
      alert("Not an Image...");
      return;
    }
    setIsUploading(true);

    setTimeout(() => {
      setIsUploading(false);
      setShowPreview(true);
      setPreview(URL.createObjectURL(fileInputRef.current.files[0]));
    }, 3000);
  };

  const handleRemove = () => {
    setPreview(null);
    setShowPreview(false);
    setIsUploading(false);
  };

  return (
    <div className="container">
      <div className="panel">
        <div className={`button_outer ${isUploading ? 'file_uploading': ''}`}>
          <button className="btn_upload" onClick={() => fileInputRef.current.click()}>
            File Uploader
            <input
              id="fileInput"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </button>
        </div>
        {isUploading && <LinearProgress variant="indeterminate" style={{background: "grey"}} />}
        {showPreview && (
          <div className="uploaded_file_view show">
            <img src={preview} alt="preview" width="200" height="200" />
            <span className="file_remove" onClick={handleRemove}>X</span>
            <div>
            {/* <AppBar position="static">
              <Toolbar>
                <Typography variant="h6">
                  Navigation Bar
                </Typography>
              </Toolbar>
            </AppBar> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUploader;
