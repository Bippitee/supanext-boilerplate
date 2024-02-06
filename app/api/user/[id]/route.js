import { supaServer } from "@/lib/supabase/server";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const supabase = supaServer();
  const id = params.id;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message, ok: false },
      { status: error.statusCode }
    );
  }

  if (!data || data.length === 0) {
    return NextResponse.json(
      { error: "User not found", ok: false },
      { status: error.statusCode }
    );
  }

  return NextResponse.json({ data: data, ok: true }, { status: 200 });
}

export async function PATCH(req, { params }) {
  const supabase = supaServer();
  const id = params.id;

  //PARSE URL to handle avatars
  const searchParams = req.nextUrl.searchParams;
  const type = searchParams.get("type");

  //HANDLE AVATAR UPLOAD
  if (type === "avatar") {
    const body = await req.formData();
    const filePath = body.get("filePath");
    const file = body.get("file");
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);

    if (error) {
      return NextResponse.json(
        { error: error.message, ok: false },
        { status: error.statusCode }
      );
    }

    //UPDATE PROFILE AVATAR URL
    let avatar_url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${filePath}`;
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .upsert({
        avatar_url: avatar_url,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .single();

    if (profileError) {
      console.log("PROFILE ERROR", profileError);
      return NextResponse.json(
        { error: profileError.message, ok: false },
        { status: profileError.statusCode }
      );
    }

    revalidateTag("profile");
    return NextResponse.json({ data: avatar_url, ok: true }, { status: 200 });
  } else {
    const body = await req.json();

    //HANDLE PROFILE UPDATE W/O AVATAR
    const { data, error } = await supabase
      .from("profiles")
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: error.message, ok: false },
        { status: error.statusCode }
      );
    }

    revalidateTag("profile");
    return NextResponse.json({ ok: true }, { status: 200 });
  }
}
