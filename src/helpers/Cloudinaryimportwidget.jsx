import React, { Component } from "react";
import Button from "react-bootstrap/Button";

class CloudinaryUploadWidget extends Component {
  componentDidMount() {
    const cloudName = "dkgopzgka"; // replace with your own cloud name
    const uploadPreset = "fdmbjiqd"; // replace with your own upload preset

    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          document
            .getElementById("uploadedimage")
            .setAttribute("src", result.info.secure_url);
        }
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }

  render() {
    return (
      <div>
        <Button>Upload</Button>
      </div>
    );
  }
}

export default CloudinaryUploadWidget;
