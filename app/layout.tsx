import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css';
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "12 Days of Christmas",
  description: "Generated by create next app",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no", // Add viewport metadata here
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}