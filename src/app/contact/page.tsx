"use client";

import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

type ContactForm = {
	name: string;
	email: string;
	message: string;
};

export default function ContactPage() {
	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ContactForm>();

	const onSubmit = async (data: ContactForm) => {
		try {
			const res = await fetch(`${BASE_URL}/Contact/contact`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			if (!res.ok) {
				throw new Error("Failed to send message");
			}
			toast.success("Message sent successfully!");
			reset();
		} catch (err: any) {
			toast.error(err.message || "Something went wrong");
		}
	};

	return (
		<div className="min-h-screen bg-zinc-50 dark:bg-black text-gray-800 dark:text-gray-200 font-sans px-6 py-12">
			<Toaster position="top-right" reverseOrder={false} />
			<div className="max-w-3xl mx-auto space-y-8">
				{/* Header */}
				<header className="text-center mb-10">
					<h1 className="text-4xl font-bold mb-3">📬 Contact Me</h1>
					<p className="text-gray-600 dark:text-gray-400">
						I'll be glad to get your opinions and suggestions!
					</p>
				</header>

				{/* Form */}
				<form
					className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md space-y-4"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div>
						<label htmlFor="name" className="block mb-2 font-medium">
							Name
						</label>
						<input
							id="name"
							type="text"
							placeholder="Your Name"
							{...register("name", { required: "Name is required" })}
							className="w-full p-3 rounded-md border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						{errors.name && (
							<p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
						)}
					</div>

					<div>
						<label htmlFor="email" className="block mb-2 font-medium">
							Email
						</label>
						<input
							id="email"
							type="email"
							placeholder="you@example.com"
							{...register("email", {
								required: "Email is required",
								pattern: {
									value: /^\S+@\S+$/i,
									message: "Invalid email address",
								},
							})}
							className="w-full p-3 rounded-md border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						{errors.email && (
							<p className="text-red-500 text-sm mt-1">
								{errors.email.message}
							</p>
						)}
					</div>

					<div>
						<label htmlFor="message" className="block mb-2 font-medium">
							Your Message
						</label>
						<textarea
							id="message"
							rows={5}
							placeholder="Type something..."
							{...register("message", { required: "Message is required" })}
							className="w-full p-3 rounded-md border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						{errors.message && (
							<p className="text-red-500 text-sm mt-1">
								{errors.message.message}
							</p>
						)}
					</div>

					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full bg-blue-600 text-white py-3 rounded-md font-bold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isSubmitting ? "Sending..." : "Submit"}
					</button>
				</form>

				{/* Other platforms */}
				<section className="text-center space-y-4">
					<h2 className="text-2xl font-semibold">Other platforms</h2>
					<div className="flex justify-center space-x-6 rtl:space-x-reverse">
						<a
							href="https://instagram.com/username"
							target="_blank"
							rel="noopener noreferrer"
							className="text-pink-500 hover:text-pink-700 transition"
						>
							Instagram
						</a>
						<a
							href="mailto:you@example.com"
							className="text-green-500 hover:text-green-700 transition"
						>
							Email
						</a>
						<a
							href="https://github.com/username"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
						>
							GitHub
						</a>
					</div>
				</section>
			</div>
		</div>
	);
}
