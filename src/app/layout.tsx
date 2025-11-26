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
	description: "A place for you to write interesting blogs",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Navbar />
				<main>{children}</main>
				<footer className="bg-gray-800 text-white p-4 text-center">
					<p>© 2025 My Blog. All rights reserved.</p>
					<div className="mt-2 space-x-4">
						<a
							href="https://github.com/Mohamad-Moghadam"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-yellow-400 transition-colors"
						>
							GitHub
						</a>
						<a
							href="https://www.linkedin.com/in/mohamad-reza-soodmand-moghadam-1687b5349/"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-yellow-400 transition-colors"
						>
							LinkedIn
						</a>
						<a
							href="/about"
							className="hover:text-yellow-400 transition-colors"
						>
							About
						</a>
					</div>
					<div className="mt-1 text-sm text-gray-400">
						Email:{" "}
						<a
							href="mailto:m.reza.s.moghadam@gmail.com"
							className="hover:text-yellow-400"
						>
							m.reza.s.moghadam@gmail.com
						</a>
					</div>
				</footer>

				<Toaster />
			</body>
		</html>
	);
}
