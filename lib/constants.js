export const SITE_NAME = "Supanext";
export const FILE_UPLOAD_DIR = "/public/data";
export const SECURE_DIRECTORIES = ["/admin", "/dashboard"];

export const HOSTNAME =
  process?.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_ENV_LOCALHOST
    : process.env.NEXT_PUBLIC_ENV_PRODHOST;
