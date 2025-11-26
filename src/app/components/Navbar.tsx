import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "My Blog",
	description: "A personal blog built with Next.js",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 dark:bg-black`}
			>
				<Navbar />
				<main className="min-h-screen">{children}</main>
				<footer className="bg-gray-800 text-white p-4 text-center mt-10">
					<p>© 2025 My Blog. All rights reserved.</p>
					<div className="mt-2 space-x-4">
						<a
							href="https://instagram.com/username"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-yellow-400 transition-colors"
						>
							Instagram
						</a>
						<a
							href="/about"
							className="hover:text-yellow-400 transition-colors"
						>
							About
						</a>
					</div>
				</footer>
				<Toaster />
			</body>
		</html>
	);
}
