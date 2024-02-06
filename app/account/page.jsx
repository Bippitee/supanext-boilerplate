import { supaServer } from "@/lib/supabase/server";
import React from "react";
import AccountForm from "./AccountForm";

const Page = async () => {
  const supabase = supaServer();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session ? <AccountForm session={session} /> : null;
};

export default Page;
