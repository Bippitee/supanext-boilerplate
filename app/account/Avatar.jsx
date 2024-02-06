"use client";
import { Button } from "@/components/ui/button";
import useProfile from "@/hooks/useProfile";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Avatar = ({ user_id, url, size = 150 }) => {
  const { avatarUpload, isLoading } = useProfile(user_id);
  const [avatarUrl, setAvatarUrl] = useState();

  useEffect(() => {
    setAvatarUrl(url);

    return () => {
      setAvatarUrl(null);
    };
  }, [url]);

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
          onChange={(e) => avatarUpload(e)}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default Avatar;
