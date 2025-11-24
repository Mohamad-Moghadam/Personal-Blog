"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation"; // 👈 اضافه شد

export default function Signup() {
	const router = useRouter(); // 👈 اینجا

	const [form, setForm] = useState({
		username: "",
		email: "",
		password: "",
		confirm: "",
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (form.password !== form.confirm) {
			toast.error("Passwords do not match!");
			return;
		}

		// اینجا درخواست به backend قرار می‌گیرد

		toast.success("Signed up successfully!");

		// هدایت به صفحه login بعد از 1 ثانیه
		setTimeout(() => {
			router.push("/login"); // 👈 انتقال
		}, 1000);

		// ریست فرم
		setForm({
			username: "",
			email: "",
			password: "",
			confirm: "",
		});
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
			<div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-200">
				<h1 className="text-3xl font-bold mb-6 text-center text-green-700">
					Create Your Account
				</h1>

				<form className="space-y-4" onSubmit={handleSubmit}>
					<div>
						<label className="block text-sm font-medium mb-1">Username</label>
						<input
							name="username"
							value={form.username}
							onChange={handleChange}
							type="text"
							placeholder="Enter username"
							className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">Email</label>
						<input
							name="email"
							value={form.email}
							onChange={handleChange}
							type="email"
							placeholder="Enter email"
							className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">Password</label>
						<input
							name="password"
							value={form.password}
							onChange={handleChange}
							type="password"
							placeholder="Enter password"
							className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">
							Confirm Password
						</label>
						<input
							name="confirm"
							value={form.confirm}
							onChange={handleChange}
							type="password"
							placeholder="Repeat your password"
							className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
					>
						Sign Up
					</button>
				</form>

				<p className="text-center text-sm mt-4">
					Already subscribed?{" "}
					<Link
						href="/login"
						className="text-green-600 font-semibold hover:underline"
					>
						Login
					</Link>
				</p>
			</div>
		</div>
	);
}
