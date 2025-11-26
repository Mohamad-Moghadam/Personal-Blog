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

			toast.success("Signed up successfully!");
			reset();
			setTimeout(() => router.push("/login"), 800);
		} catch (error) {
			console.error(error);
			toast.error("Connection error");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-6 bg-zinc-100 dark:bg-black">
			<div className="bg-white dark:bg-zinc-900 p-10 rounded-2xl shadow-lg border border-gray-200 dark:border-zinc-700 w-full max-w-lg">
				<h1 className="text-3xl font-bold text-center mb-6 text-green-700 dark:text-green-400">
					Create Your Account
				</h1>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					{/* Username */}
					<div>
						<input
							{...register("username", { required: true })}
							placeholder="Username"
							className="w-full p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-green-500 outline-none"
						/>
						{errors.username && (
							<p className="text-red-500 text-sm">Username is required</p>
						)}
					</div>

					{/* Email */}
					<div>
						<input
							{...register("email", { required: true })}
							type="email"
							placeholder="Email Address"
							className="w-full p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-green-500 outline-none"
						/>
						{errors.email && (
							<p className="text-red-500 text-sm">Email is required</p>
						)}
					</div>

					{/* Password */}
					<div>
						<input
							{...register("password", { required: true })}
							type="password"
							placeholder="Password"
							className="w-full p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-green-500 outline-none"
						/>
						{errors.password && (
							<p className="text-red-500 text-sm">Password is required</p>
						)}
					</div>

					{/* Confirm Password */}
					<div>
						<input
							{...register("confirm", { required: true })}
							type="password"
							placeholder="Confirm Password"
							className="w-full p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-green-500 outline-none"
						/>
						{errors.confirm && (
							<p className="text-red-500 text-sm">Please confirm password</p>
						)}
					</div>

					{/* Button */}
					<button
						type="submit"
						className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
					>
						Sign Up
					</button>
				</form>

				<p className="text-center text-sm mt-5 text-gray-700 dark:text-gray-300">
					Already subscribed?{" "}
					<Link
						href="/login"
						className="text-green-600 dark:text-green-400 font-semibold hover:underline"
					>
						Log in
					</Link>
				</p>
			</div>
		</div>
	);
}
