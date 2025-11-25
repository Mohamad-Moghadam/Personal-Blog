"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

type SignupForm = {
	username: string;
	email: string;
	password: string;
	confirm: string;
};

export default function Signup() {
	const router = useRouter();
	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<SignupForm>();
	const password = watch("password");

	const onSubmit = async (data: SignupForm) => {
		if (data.password !== data.confirm) {
			toast.error("Passwords do not match");
			return;
		}
		try {
			const res = await fetch(`${BASE_URL}/Subscribers/subscribe/`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: data.username,
					email: data.email,
					password: data.password,
				}),
			});
			if (!res.ok) {
				toast.error("Signup failed");
				return;
			}
			toast.success("Signed up successfully");
			reset();
			setTimeout(() => router.push("/login"), 1000);
		} catch (err) {
			console.error(err);
			toast.error("Connection error");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
			<div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-200">
				<h1 className="text-3xl font-bold mb-6 text-center text-green-700">
					Create Your Account
				</h1>
				<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
					<input
						{...register("username", { required: true })}
						placeholder="Enter your username"
						className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
					/>
					<input
						{...register("email", { required: true })}
						type="email"
						placeholder="Enter your email address"
						className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
					/>
					<input
						{...register("password", { required: true })}
						type="password"
						placeholder="Enter your password"
						className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
					/>
					<input
						{...register("confirm", { required: true })}
						type="password"
						placeholder="Confirm your password"
						className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
					/>
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
