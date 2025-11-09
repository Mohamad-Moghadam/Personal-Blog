export default function ContactPage() {
	return (
		<div className="min-h-screen bg-zinc-50 dark:bg-black text-gray-800 dark:text-gray-200 font-sans px-6 py-12">
			<div className="max-w-3xl mx-auto space-y-8">
				{/* Header */}
				<header className="text-center mb-10">
					<h1 className="text-4xl font-bold mb-3">📬 Contact Me</h1>
					<p className="text-gray-600 dark:text-gray-400">
						I'll be glad to get your opinions and suggestions!
					</p>
				</header>

				<form className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md space-y-4">
					<div>
						<label htmlFor="name" className="block mb-2 font-medium">
							Name
						</label>
						<input
							type="text"
							id="name"
							placeholder="Your Name"
							className="w-full p-3 rounded-md border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label htmlFor="email" className="block mb-2 font-medium">
							Email
						</label>
						<input
							type="email"
							id="email"
							placeholder="you@example.com"
							className="w-full p-3 rounded-md border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label htmlFor="message" className="block mb-2 font-medium">
							Your Message
						</label>
						<textarea
							id="message"
							rows={5}
							placeholder="Type Something..."
							className="w-full p-3 rounded-md border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
						></textarea>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-600 text-white py-3 rounded-md font-bold hover:bg-blue-700 transition"
					>
						Submit
					</button>
				</form>

				<section className="text-center space-y-4">
					<h2 className="text-2xl font-semibold">
						Other platforms
					</h2>
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
