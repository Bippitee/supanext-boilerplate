"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { FILE_UPLOAD_DIR } from "@/lib/constants";

export function FileUpload({ path = "uploads", filetypes = "image/*" }) {
  const [file, setFile] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch(`/api/upload/${path}`, {
        method: "POST",
        body: data,
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());
      // handle the response
      console.log(
        await res.json(),
        "File uploaded at ",
        FILE_UPLOAD_DIR + "/" + path + "/" + file.name
      );
    } catch (e) {
      // Handle errors here
      console.error(e);
    } finally {
      //   setFile(null);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="grid w-full max-w-sm items-center gap-1.5">
      <Input
        id="picture"
        type="file"
        accept={filetypes}
        onChange={(e) => setFile(e.target.files?.[0])}
      />
      <Button type="submit">Upload</Button>
    </form>
  );
}
