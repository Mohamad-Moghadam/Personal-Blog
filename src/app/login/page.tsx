"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

type LoginForm = {
	username: string;
	password: string;
};

export default function Login() {
	const router = useRouter();
	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<LoginForm>();

	const onSubmit = async (data: LoginForm) => {
		try {
			const res = await fetch(`${BASE_URL}/Subscribers/token/`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (!res.ok) {
				toast.error("Invalid username or password");
				return;
			}

			const json = await res.json();
			const token = json.access;

			if (!token) {
				toast.error("Token not received");
				return;
			}

			localStorage.setItem("token", token);
			toast.success("Logged in successfully");
			reset();
			setTimeout(() => router.push("/"), 800);
		} catch {
			toast.error("Connection error");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-6 bg-zinc-100 dark:bg-black">
			<div className="bg-white dark:bg-zinc-900 p-10 rounded-2xl shadow-lg border border-gray-200 dark:border-zinc-700 w-full max-w-lg">
				<h1 className="text-3xl font-bold text-center mb-6 text-green-700 dark:text-green-400">
					Welcome Back
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

					{/* Login Button */}
					<button
						type="submit"
						className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
					>
						Login
					</button>
				</form>

				<p className="text-center text-sm mt-5 text-gray-700 dark:text-gray-300">
					Don’t have an account?{" "}
					<Link
						href="/signup"
						className="text-green-600 dark:text-green-400 font-semibold hover:underline"
					>
						Sign Up
					</Link>
				</p>
			</div>
		</div>
	);
}
