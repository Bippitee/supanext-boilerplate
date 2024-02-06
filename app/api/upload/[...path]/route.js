// file upload route that places the file in the 'user-uploads' directory in /public
// and returns the file name to the client

import { FILE_UPLOAD_DIR } from "@/lib/constants";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
const { NextResponse } = require("next/server");

export async function POST(req, { params }) {
  const path = params.path.join("/");
  const data = await req.formData();
  const file = data.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file to upload" }, 400);
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fullpath = join(
    process.cwd(),
    FILE_UPLOAD_DIR,
    "/",
    path,
    "/",
    file.name
  );

  const directory = join(process.cwd(), FILE_UPLOAD_DIR, path);
  await mkdir(directory, { recursive: true });
  await writeFile(fullpath, buffer);

  return NextResponse.json({ success: true, file: file.name, path: fullpath });
}
