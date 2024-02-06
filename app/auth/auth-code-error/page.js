// pages/auth/auth-code-error.js

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthCodeError() {
  const router = useRouter();
  const { error, error_code, error_description } = router.query;

  return (
    <div className="flex items-center justify-center w-full flex-grow sm:mb-40">
      <div className="w-96 rounded border p-4 shadow-md">
        <div className="flex items-center gap-2">
          <UserRoundIcon className="w-8 h-8" />
          <h1 className="text-2xl">{SITE_NAME}</h1>
        </div>
        <div className="mt-4 grid gap-2">
          <h1>Authentication Code Error</h1>
          <p>Error: {error}</p>
          <p>Error Code: {error_code}</p>
          <p>Error Description: {decodeURIComponent(error_description)}</p>
          <Link href="/auth">
            <a>Retry</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
