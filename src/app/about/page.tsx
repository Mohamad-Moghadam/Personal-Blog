import Image from "next/image";

export default function AboutPage() {
	return (
		<div className="flex flex-col md:flex-row-reverse min-h-screen items-start justify-center bg-zinc-50 dark:bg-black font-sans p-8 md:space-x-12 md:space-x-reverse">
			{/* بخش تصویر */}
			<section className="flex-shrink-0 mb-8 md:mb-0 md:w-1/3 flex justify-center relative">
				<div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px]">
					{/* حلقه گرادیانت پشت تصویر */}
					<div className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-green-400 to-purple-500 rounded-full blur-md opacity-70 animate-pulse"></div>
					<Image
						src="/1000109887.jpg"
						alt="Profile Image"
						width={320}
						height={320}
						className="rounded-full object-cover shadow-2xl relative z-10 border-4 border-white dark:border-zinc-900"
					/>
				</div>
			</section>

			{/* بخش اصلی محتوا */}
			<main className="max-w-3xl w-full md:w-2/3 space-y-8">
				{/* درباره من */}
				<section className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg shadow">
					<h1 className="text-3xl font-bold mb-4">About Me</h1>
					<p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line">
						Hi, I’m{" "}
						<span className="font-semibold text-blue-700 dark:text-blue-300">
							Mohammad Reza
						</span>{" "}
						— a lifelong learner who used to teach English and now writes code
						instead of grammar rules 😄 I started my journey in tech because
						I’ve always been fascinated by how things work — how servers talk to
						each other, how data moves, and how a few lines of logic can make
						something useful come to life. I’m currently diving deeper into
						full-stack development, working my way from backend systems and APIs
						toward frontend and deployment. Along the way, I write about what I
						learn — the wins, the bugs, and the “why isn’t this working?!”
						moments that every developer knows too well. I believe in growing
						with technology, not just using it.
					</p>
				</section>

				{/* تجربه */}
				<section>
					<h2 className="text-2xl font-bold mb-3 border-b border-gray-300 dark:border-zinc-700 pb-2">
						Experience
					</h2>
					<p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
						I started my professional journey as an English teacher — helping
						students find confidence in learning and communication. Teaching
						taught me how to break complex ideas into simple steps, stay
						patient, and keep learning even when things get tough. Now, as a
						Computer Science student exploring full-stack development, I bring
						that same mindset into coding — explaining problems clearly, staying
						curious, and turning challenges into lessons.
					</p>
				</section>

				{/* مهارت‌ها */}
				<section>
					<h2 className="text-2xl font-bold mb-3 border-b border-gray-300 dark:border-zinc-700 pb-2">
						Skills
					</h2>
					<div className="space-y-4 text-gray-700 dark:text-gray-300">
						<div>
							<h3 className="font-semibold text-lg mb-1">💻 Backend</h3>
							<p>
								Python, Django, Django REST Framework, Celery, RabbitMQ, Redis,
								PostgreSQL
							</p>
						</div>

						<div>
							<h3 className="font-semibold text-lg mb-1">🐳 DevOps & Tools</h3>
							<p>Docker, Git, Vercel, API design & deployment</p>
						</div>

						<div>
							<h3 className="font-semibold text-lg mb-1">
								🎨 Frontend (in progress)
							</h3>
							<p>HTML, CSS, JavaScript, React, Next.js</p>
						</div>

						<div>
							<h3 className="font-semibold text-lg mb-1">🌱 Other Skills</h3>
							<p>
								English teaching, problem-solving, documentation, mentoring
								mindset
							</p>
						</div>
					</div>
				</section>

				{/* تماس */}
				<section className="bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-700 dark:to-emerald-800 p-6 rounded-lg text-center text-white shadow-lg">
					<h2 className="text-2xl font-bold mb-4">Get in Touch!</h2>
					<p className="mb-4">
						I’d love to hear from you! Whether you have a question, a project
						idea, or just want to say hi — feel free to reach out.
					</p>
					<a
						href="/contact"
						className="bg-white text-green-600 font-bold px-6 py-2 rounded hover:bg-gray-100 transition"
					>
						Contact Me
					</a>
				</section>
			</main>
		</div>
	);
}
