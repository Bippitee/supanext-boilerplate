import { FileUpload } from "@/components/FileUpload";
import React from "react";

const page = () => {
  return (
    <>
      <div className="flex-grow self-center pt-20">
        <h3>Includes: File Upload</h3>
        <p>
          This will upload a file into the /public uploads folder based on the
          "FILE_UPLOAD_DIR" provided in lib/constants.js.{" "}
        </p>
        <p>
          The file will be placed in a directory based on the path provided
          which can be subdirectories, (e.g
          path="/user-uploads/somesubdirectory/") but defaults to "uploads" if
          no path is provided.
        </p>
        <FileUpload path="user-uploads" />
      </div>
    </>
  );
};

export default page;
