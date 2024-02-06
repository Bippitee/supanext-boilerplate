"use client";
import { Button } from "@/components/ui/button";
import { uploadAvatar } from "@/lib/dal/user";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Avatar = ({ user_id, url, size = 150 }) => {
  // const { avatarUpload, isLoading } = useProfile(user_id);
  const [avatarUrl, setAvatarUrl] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setAvatarUrl(url);

    return () => {
      setAvatarUrl(null);
    };
  }, [url]);

  const handleFileUpload = async (e) => {
    setIsLoading(true);
    const file = e.target.files[0];
    if (!file) return setIsLoading(false);

    const fileExt = file.name.split(".").pop();
    const filePath = `${user_id}-${Math.random()}.${fileExt}`; //randomised to prevent dupes.

    const formData = new FormData();
    formData.append("file", file);
    formData.append("filePath", filePath);

    const response = await uploadAvatar(user_id, formData);
    if (response.error) {
      console.error("Error uploading avatar:", response.error);
      setIsLoading(false);
    }
    if (response.ok) {
      console.log("Avatar uploaded:", response);
      setAvatarUrl(response.data);
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto">
      {avatarUrl ? (
        <Image
          width={size}
          height={size}
          src={avatarUrl}
          alt="Avatar"
          className="rounded-md object-cover border border-border"
          style={{ height: size, width: size }}
          priority
        />
      ) : (
        <div
          className="rounded-md no-image"
          style={{ height: size, width: size }}
        />
      )}
      <div style={{ width: size }}>
        <Button asChild className="w-full my-3">
          <label htmlFor="single">
            {isLoading ? (
              <Loader2 className="w-8 h-8 animate-spin" />
            ) : (
              "Upload"
            )}
          </label>
        </Button>
        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={(e) => handleFileUpload(e)}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default Avatar;
