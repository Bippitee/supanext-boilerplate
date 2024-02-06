"use client";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SITE_NAME } from "@/lib/constants";
import { supaBrowser } from "@/lib/supabase/browser";
import { cn } from "@/lib/utils";
import { UserRoundIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/";

  const handleOAuthLogin = async (provider) => {
    const supabase = supaBrowser();

    supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo:
          //   process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL ||
          window.location.origin + "/auth/callback?next=" + next, //can add ?next=/dashboard for instance to redirect after login
      },
    });
  };

  const handleEmailPassLogin = async (email, pass) => {
    const supabase = supaBrowser();

    supabase.auth.signInWithPassword({
      email: email,
      password: pass,
      options: {
        redirectTo:
          //   process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL ||
          window.location.origin + "/auth/callback?next=" + next, //can add ?next=/dashboard for instance to redirect after login
      },
    });
  };

  const handleEmailOTP = async (email) => {
    const supabase = supaBrowser();

    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: window.location.origin + "/auth/callback?next=" + next,
        // shouldCreateUser: false
      },
    });

    if (data?.user === null && data?.session === null && error === null) {
      {
        // User is signed in
        setShowOTP(true);
      }
    }
  };

  const handleVerifyOTP = async (email, otp) => {
    const supabase = supaBrowser();

    const { data, error } = await supabase.auth.verifyOtp({
      email: email,
      token: otp,
      type: "email",
    });

    if (error) {
      console.error("Error during OTP verification:", error.message);
      return;
    }

    if (data) {
      // User is signed in
      router.push("/auth/callback?next=" + next);
    }
  };

  //   TODO: Work on janky flip card

  return (
    <>
      <div className="flex items-center justify-center w-full flex-grow sm:mb-40 | perspective">
        <div className="relative w-96 h-80">
          <div
            className={cn(
              "preserve3d | inline-block transition-transform duration-500",
              showOTP && "rotate-y-180"
            )}>
            <div className="front absolute h-full backface-hidden | w-96 rounded border p-4 bg-background shadow-md">
              <div className="flex items-center gap-2">
                <UserRoundIcon className="w-8 h-8" />
                <h1 className="text-2xl">{SITE_NAME}</h1>
              </div>
              <p className="text-muted-foreground">Register or sign-in below</p>

              <div className="mt-4 grid gap-2">
                <Button
                  className="w-full flex items-center"
                  variant="outline"
                  onClick={() => handleOAuthLogin("github")}>
                  <Icons.github className="w-6 h-6 inline-block mr-2" />
                  Github
                </Button>
                <Button
                  className="w-full flex items-center"
                  variant="outline"
                  onClick={() => handleOAuthLogin("google")}>
                  <Icons.google className="w-5 h-5 inline-block mr-2" />
                  Google
                </Button>
              </div>

              <hr className="my-4 border-1" />

              <div className="mt-4 grid gap-2">
                <Input
                  className="w-full"
                  placeholder="Email"
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => handleEmailOTP(email)}>
                  Send One-Time Password
                </Button>
              </div>

              {/* {showOTP ? (
            <div>
              <div className="text-muted-foreground mb-2">
                Check your email for a one-time password
              </div>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  placeholder="One-Time Password"
                  value={otp}
                  type="email"
                  onChange={(e) => setOTP(e.target.value)}
                />
                <Button
                  variant="outline"
                  onClick={() => handleVerifyOTP(email, otp)}>
                  Verify
                </Button>
              </div>
            </div>
          ) : (
            <div className="mt-4 grid gap-2">
              <Input
                className="w-full"
                placeholder="Email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                className="w-full"
                variant="outline"
                onClick={() => handleEmailOTP(email)}>
                Send One-Time Password
              </Button>
            </div>
          )} */}
            </div>
            <div className="back rotate-y-180 backface-hidden  |  w-96 h-80 rounded border p-4 shadow-md bg-background">
              <div className="flex h-full flex-col justify-center">
                <div className="text-muted-foreground mb-2">
                  Check your email for a one-time password
                </div>
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input
                    placeholder="One-Time Password"
                    value={otp}
                    type="email"
                    onChange={(e) => setOTP(e.target.value)}
                  />
                  <Button
                    variant="outline"
                    onClick={() => handleVerifyOTP(email, otp)}>
                    Verify
                  </Button>
                </div>
                <div className="mt-8">
                  Didn't get an email?{" "}
                  <Button variant="link" onClick={() => setShowOTP(false)}>
                    Try again.
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
