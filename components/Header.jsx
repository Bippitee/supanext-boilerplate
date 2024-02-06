import { HOSTNAME, SITE_NAME } from "@/lib/constants";
import Link from "next/link";
import React from "react";
import HeaderProfile from "./HeaderProfile";
import { supaServer } from "@/lib/supabase/server";
import { DarkModeToggle } from "./ui/dark-mode-toggle";
import { getProfile } from "@/lib/dal/user";
import { Button } from "./ui/button";

const Header = async () => {
  const supabase = supaServer();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const id = session?.user.id;

  let { data } = await getProfile(id);

  // if (!profile) return null;
  return (
    <header className="flex items-center justify-between py-4">
      <Link href="/">
        <h1 className="text-foreground">{SITE_NAME}</h1>
      </Link>

      <div className="flex items-center">
        {data ? (
          <HeaderProfile id={id} profile={data} />
        ) : (
          <Button asChild>
            <Link href="/auth">Login</Link>
          </Button>
        )}
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default Header;
