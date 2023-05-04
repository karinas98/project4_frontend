import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { REACT_APP_CLOUDINARY_CLOUD_NAME } from "../consts-data";

// Import required actions and qualifiers.
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";

export default function CloudinaryImage({ img_url }) {
  // Create and configure your Cloudinary instance.
  const cld = new Cloudinary({
    cloud: {
      cloudName: REACT_APP_CLOUDINARY_CLOUD_NAME,
    },
  });

  // Use the image with public ID, 'front_face'.
  const myImage = cld.image(img_url);

  // Apply the transformation.
  myImage
    .resize(thumbnail().width(318).height(300).gravity(focusOn(FocusOn.face()))) // Crop the image, focusing on the face.
    .roundCorners(byRadius(4)); // Round the corners.

  // Render the transformed image in a React component.
  return (
    <div>
      <AdvancedImage cldImg={myImage} />
    </div>
  );
}
