"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	const links = [
		{ name: "Home", href: "/" },
		{ name: "About Me", href: "/about" },
		{ name: "Blog", href: "/blog" },
		{ name: "Contact Me", href: "/contact" },
	];

	return (
		<nav className="bg-gray-800 text-white p-4">
			<div className="max-w-7xl mx-auto flex justify-between items-center">
				<div className="text-xl font-bold">My Blog</div>

				<div className="md:hidden">
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="focus:outline-none"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							{isOpen ? (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							) : (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							)}
						</svg>
					</button>
				</div>

				<div
					className={`flex-col md:flex md:flex-row md:space-x-8 absolute md:static bg-gray-800 w-full md:w-auto left-0 md:left-auto transition-all duration-300 ${
						isOpen ? "top-16 flex" : "top-[-200px] hidden"
					}`}
				>
					{links.map((link) => (
						<Link
							key={link.name}
							href={link.href}
							className="block px-4 py-2 hover:text-yellow-400"
							onClick={() => setIsOpen(false)}
						>
							{link.name}
						</Link>
					))}
				</div>
			</div>
		</nav>
	);
}
