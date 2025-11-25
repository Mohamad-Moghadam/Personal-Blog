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
			const res = await fetch(`${BASE_URL}/Subscribers/token`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			if (!res.ok) {
				toast.error("Invalid username or password");
				return;
			}
			const json = await res.json();
			const token = json.access_token;
			if (!token) {
				toast.error("Token not received");
				return;
			}
			localStorage.setItem("token", token);
			toast.success("Logged in successfully");
			reset();
			setTimeout(() => router.push("/"), 1000);
		} catch {
			toast.error("Connection error");
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
			<div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-200">
				<h1 className="text-3xl font-bold text-center mb-6 text-green-700">
					Login
				</h1>
				<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
					<input
						{...register("username", { required: true })}
						placeholder="Username"
						className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
					/>
					<input
						{...register("password", { required: true })}
						type="password"
						placeholder="Password"
						className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
					/>
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
