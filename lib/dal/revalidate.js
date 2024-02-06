"use server";

import { revalidateTag } from "next/cache";

//this is a wrapper for revalidateTag to make it easier to use in API calls
export default async function revalidate(tag) {
  revalidateTag(tag);
}
