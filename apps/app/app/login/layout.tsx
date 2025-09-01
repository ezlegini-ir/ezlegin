import { Metadata } from "next";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`p-3 h-screen bg-gray-950`}>
      <main className="w-full h-full max-w-screen-xl mx-auto">{children}</main>
    </div>
  );
}

export const metadata: Metadata = {
  title: `🔏 Login Page`,
  description:
    "Login to your account to access exclusive features and personalized content on our platform. Enter your credentials below to get started.",
};
