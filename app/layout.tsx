import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Learning Journey",
  description:
    "An interactive learning project for interns to master Next.js, React, and Tailwind CSS through hands-on tasks and exercises.",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Web Development",
    "Learning",
    "Tutorial",
    "Internship",
    "Programming",
  ],
  authors: [
    {
      name: "Your Organization",
      url: "https://your-organization.com",
    },
  ],
  creator: "Your Organization",
  publisher: "Your Organization",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "Next.js Learning Journey",
    description:
      "Master Next.js, React, and Tailwind CSS through interactive tasks",
    siteName: "Next.js Learning Journey",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js Learning Journey",
    description:
      "Master Next.js, React, and Tailwind CSS through interactive tasks",
    creator: "@yourhandle",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  category: "Education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>{children}</body>
    </html>
  );
}
