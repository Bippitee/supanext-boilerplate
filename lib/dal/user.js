import { HOSTNAME } from "../constants";
import revalidate from "./revalidate";

export async function getProfile(id) {
  const res = await fetch(`${HOSTNAME}/api/user/${id}`, {
    next: { tags: ["profile"] },
  });
  const profile = await res.json();

  return profile;
}

export async function updateProfile(id, data) {
  const res = await fetch(`${HOSTNAME}/api/user/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update profile");
  }

  revalidate("profile");

  return res.json();
}

export async function uploadAvatar(id, data) {
  const res = await fetch(`${HOSTNAME}/api/user/${id}?type=avatar`, {
    method: "PATCH",
    body: data,
  });

  if (!res.ok) {
    throw new Error("Failed to upload avatar", res.error);
  }

  revalidate("profile");
  return res.json();
}
