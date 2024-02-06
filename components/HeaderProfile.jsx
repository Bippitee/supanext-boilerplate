"use client";
import { Button } from "./ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supaBrowser } from "@/lib/supabase/browser";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem as MenuItem,
  DropdownMenuLabel as MenuLabel,
  DropdownMenuSeparator as MenuSeparator,
  DropdownMenuGroup as MenuGroup,
} from "./ui/dropdown-menu";
import useProfile from "@/hooks/useProfile";
import { SECURE_DIRECTORIES } from "@/lib/constants";
import { toast } from "sonner";

const HeaderProfile = ({ id }) => {
  const {
    isLoading,
    profile,
    error,
    invalidate: invalidateProfile,
  } = useProfile(id);

  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    invalidateProfile();
    const supabase = supaBrowser();
    const { error } = await supabase.auth.signOut();
    if (error) toast.error("Error logging out:", error.message);
    router.refresh();
    if (SECURE_DIRECTORIES.includes(pathname))
      router.replace("/auth?next=" + pathname);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-8 h-8 border-t-4 border-r-4 border-primary rounded-full animate-spin duration-500 " />
      </div>
    );
  } else if (error) {
    return (
      <div className="text-red-500">
        <p>Error loading user data: {error}</p>
      </div>
    );
  } else {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="focus-visible:outline-0">
          <Avatar className="animate-pop-in">
            {profile.username && (
              <AvatarFallback className="bg-primary ">
                {getInitials(profile.full_name)}
              </AvatarFallback>
            )}
            <AvatarImage src={profile.avatar_url} />
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-56"
          collisionPadding={{ top: 20, right: 10 }}>
          <MenuLabel>My Account</MenuLabel>

          <MenuSeparator />

          <MenuGroup>
            <MenuItem asChild>
              <Link href="/account">Profile</Link>
            </MenuItem>
          </MenuGroup>

          <MenuSeparator />

          <MenuItem className="justify-center">
            <Button
              variant="secondary"
              className="w-full"
              onClick={handleLogout}>
              Sign out
            </Button>
          </MenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
};

export default HeaderProfile;

//get initials from full name
function getInitials(name) {
  const [firstName, lastName] = name.split(" ");
  return `${firstName.charAt(0)}${lastName.charAt(0)}`;
}
