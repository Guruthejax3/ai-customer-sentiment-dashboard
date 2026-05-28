import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Customer Sentiment Analysis Dashboard",
  description: "BERT-powered real-time customer sentiment tracking pipeline",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}