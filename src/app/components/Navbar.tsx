"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const router = useRouter();
	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

	const links = [
		{ name: "Home", href: "/" },
		{ name: "About Me", href: "/about" },
		{ name: "Blog", href: "/blog" },
		{ name: "Contact Me", href: "/contact" },
	];

	useEffect(() => {
		const token = localStorage.getItem("token");
		setIsLoggedIn(!!token);
	}, []);

	const logoutHandler = async () => {
		try {
			const token = localStorage.getItem("token");

			await fetch(`${BASE_URL}/Subscribers/signout/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			localStorage.removeItem("token");
			setIsLoggedIn(false);
			toast.success("Logged out");

			setTimeout(() => router.push("/"), 400);
		} catch {
			localStorage.removeItem("token");
			setIsLoggedIn(false);
			toast.error("Error, but logged out.");
		}
	};

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
					className={`flex-col md:flex md:flex-row md:space-x-8 fixed md:static bg-gray-800 w-full md:w-auto left-0 transition-all duration-300 z-50 ${
						isOpen ? "top-0 flex" : "top-[-200px] hidden"
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

					{!isLoggedIn && (
						<Link
							href="/login"
							className="block px-4 py-2 hover:text-green-400"
							onClick={() => setIsOpen(false)}
						>
							Login
						</Link>
					)}

					{isLoggedIn && (
						<button
							onClick={logoutHandler}
							className="block px-4 py-2 text-left hover:text-red-400"
						>
							Logout
						</button>
					)}
				</div>
			</div>
		</nav>
	);
}
