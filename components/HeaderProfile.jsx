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
import { SECURE_DIRECTORIES } from "@/lib/constants";
import { toast } from "sonner";
import { revalidateTag } from "next/cache";
import revalidate from "@/lib/dal/revalidate";

const HeaderProfile = ({ id, profile }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    const supabase = supaBrowser();
    revalidate("profile");
    const { error } = await supabase.auth.signOut();
    if (error) toast.error("Error logging out:", error.message);
    router.refresh();
    if (SECURE_DIRECTORIES.includes(pathname))
      router.replace("/auth?next=" + pathname);
  };

  if (profile) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="focus-visible:outline-0">
          <Avatar className="animate-pop-in">
            {profile.username && (
              <AvatarFallback className="bg-primary ">
                {getInitials(profile.full_name)}
              </AvatarFallback>
            )}
            <AvatarImage src={profile.avatar_url} className="animate-pop-in" />
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
// };

export default HeaderProfile;

//get initials from full name
function getInitials(name) {
  const [firstName, lastName] = name.split(" ");
  return `${firstName.charAt(0)}${lastName.charAt(0)}`;
}
