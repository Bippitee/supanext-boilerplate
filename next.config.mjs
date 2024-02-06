let supabaseImageBucket = process.env.NEXT_PUBLIC_SUPABASE_URL;
//remove https:// from the url
supabaseImageBucket = supabaseImageBucket.replace("https://", "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        //google avatars
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
      },
      {
        //github avatars
        hostname: "avatars.githubusercontent.com",
        protocol: "https",
      },
      {
        //supabase storage
        hostname: supabaseImageBucket,
        protocol: "https",
      },
    ],
  },
  // logging: {
  //   fetches: {
  //     fullUrl: true,
  //   },
  // },
};

export default nextConfig;
