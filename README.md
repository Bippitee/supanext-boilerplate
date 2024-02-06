# SUPANEXT - Next.js + Tailwind + Supabase Boilerplate

This boilerplate provides a quick start for building applications using Next.js, Tailwind CSS, and Supabase. It also includes basic components from Shadcn, and built-in authorization through GitHub, Google, and email OTP.

## Features

- **Next.js**: A React framework for building modern web applications.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Supabase**: An open-source Firebase alternative that provides a backend-as-a-service.
- **Shadcn**: A library of basic components for building your UI.

- **Authorization**: Built-in authorization through GitHub, Google, and email OTP using Supabase.
- **Light and Dark Modes**: Easily switch between light and dark themes.
- **Toaster Notifications**: A built-in toaster function for displaying notifications.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Bippitee/Supanext-Boilerplate.git
```

2. Install the dependencies

```bash
npm install
# or
yarn install
```

3. Create a .env.local file in the root directory and fill in your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
