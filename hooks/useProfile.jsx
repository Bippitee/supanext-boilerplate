"use client";
import { supaBrowser } from "@/lib/supabase/browser";
import { useState, useEffect, useCallback, useReducer } from "react";
import { toast } from "sonner";

const initialState = {
  isLoading: true,
  profile: null,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isLoading: true };
    case "SET_PROFILE":
      return { ...state, profile: action.profile, isLoading: false };
    case "SET_ERROR":
      return { ...state, error: action.error, isLoading: false };
    default:
      throw new Error();
  }
}

const useProfile = (id) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProfile = useCallback(async () => {
    //if profile exists, exit
    if (state.profile) return;

    //otherwise grab it
    console.log("Fetching user data...");
    const supabase = supaBrowser();
    try {
      dispatch({ type: "START_LOADING" });

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`*`)
        .eq("id", id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        let avatar_url = data.avatar_url;
        if (!String(avatar_url).startsWith("http")) {
          avatar_url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${avatar_url}`;
        }
        dispatch({
          type: "SET_PROFILE",
          profile: { ...state.profile, ...data, avatar_url },
        });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", error: error.message });
    }
  }, [id]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const invalidate = () => {
    dispatch({ type: "SET_PROFILE", profile: null });
  };

  const avatarUpload = async (e) => {
    console.log("Uploading avatar...");
    toast.info("Uploading avatar...");
    dispatch({ type: "START_LOADING" });
    const supabase = supaBrowser();
    try {
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${id}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      let avatar_url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${filePath}`;

      const { data, error } = await supabase
        .from("profiles")
        .upsert({
          avatar_url,
          updated_at: new Date().toISOString(),
        })
        .single();

      if (error) {
        console.log("Error updating profile:", error);
      }
      if (data) {
        console.log("Profile updated:", data);
        dispatch({
          type: "SET_PROFILE",
          profile: { ...state.profile, avatar_url },
        });
        toast.success("Avatar uploaded!");
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", error: error.message });
      toast.error("Error uploading avatar:", error.message);
    } finally {
      dispatch({ type: "START_LOADING", isLoading: false });
    }
  };

  const updateProfile = async (data) => {
    console.log("Updating profile...");
    dispatch({ type: "START_LOADING" });
    const supabase = supaBrowser();
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .upsert({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .single();

      if (error) {
        throw error;
      }

      dispatch({ type: "SET_PROFILE", profile });
      toast.success("Profile updated!");
    } catch (error) {
      dispatch({ type: "SET_ERROR", error: error.message });
      toast.error("Error updating profile:", error.message);
    } finally {
      dispatch({ type: "START_LOADING", isLoading: false });
    }
  };

  // return { isLoading, profile, error, invalidate, avatarUpload, updateProfile };
  return { ...state, invalidate, avatarUpload, updateProfile };
};

export default useProfile;
