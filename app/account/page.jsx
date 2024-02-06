import { supaServer } from "@/lib/supabase/server";
import React from "react";
import AccountForm from "./AccountForm";
import { getProfile } from "@/lib/dal/user";

const Page = async () => {
  const supabase = supaServer();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const id = session?.user.id;

  let { data } = await getProfile(id);

  return data ? <AccountForm profile={data} session={session} /> : null;
};

export default Page;
