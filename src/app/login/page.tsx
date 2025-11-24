"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
	const router = useRouter();

	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

	const [form, setForm] = useState({
		username: "",
		password: "",
	});

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch(`${BASE_URL}/Subscribers/token`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form),
			});

			if (!res.ok) {
				toast.error("Username or password is incorrect");
				return;
			}

			const data = await res.json();

			// فرض می‌کنیم API این را برمی‌گرداند:
			// { "access_token": "xxxxx" }
			const token = data.access_token;

			if (!token) {
				toast.error("Token not received!");
				return;
			}

			// ذخیره توکن
			localStorage.setItem("token", token);

			toast.success("Logged in successfully!");

			// هدایت به داشبورد
			setTimeout(() => {
				router.push("/dashboard");
			}, 1000);
		} catch (err) {
			console.error(err);
			toast.error("Connection error!");
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
			<div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-200">
				<h1 className="text-3xl font-bold text-center mb-6 text-green-700">
					Login
				</h1>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="text-sm font-medium block mb-1">Username</label>
						<input
							type="text"
							name="username"
							value={form.username}
							onChange={handleChange}
							placeholder="Enter username"
							className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
						/>
					</div>

					<div>
						<label className="text-sm font-medium block mb-1">Password</label>
						<input
							type="password"
							name="password"
							value={form.password}
							onChange={handleChange}
							placeholder="Enter password"
							className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
					>
						Login
					</button>
				</form>

				<p className="text-center text-sm mt-4">
					Don’t have an account?{" "}
					<Link
						href="/signup"
						className="text-green-600 font-semibold hover:underline"
					>
						Sign Up
					</Link>
				</p>
			</div>
		</div>
	);
}
