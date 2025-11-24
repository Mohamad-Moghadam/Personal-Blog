export default function Signup() {
	return (
		<div className="min-h-screen flex items-center justify-center p-6">
			<div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
				<h1 className="text-2xl font-bold mb-4">Sign Up</h1>
				<form className="space-y-4">
					<input
						type="email"
						placeholder="Email"
						className="w-full border p-2 rounded"
					/>
					<button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}
