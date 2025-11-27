import Image from "next/image";

export default function AboutPage() {
	return (
		<div className="flex flex-col md:flex-row-reverse min-h-screen items-start justify-center bg-zinc-50 dark:bg-black font-sans p-8 md:space-x-12 md:space-x-reverse">
			<main className="max-w-3xl w-full md:w-2/3 space-y-8">
				<section className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg shadow">
					<h1 className="text-3xl font-bold mb-4">About Me</h1>
					<p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line">
						<span className="font-semibold text-blue-700 dark:text-blue-300">
							Mohammad Reza,
						</span>{" "}
						a lifelong learner who once taught English and now writes code
						instead of grammar rules. I got into tech because I’ve always been
						fascinated by how things work, how servers talk to each other, how
						data flows through APIs and databases, and how a few lines of logic
						can transform ideas into real applications. I’m currently diving
						deeper into full-stack development, exploring backend systems,
						building and optimizing APIs, working with databases, crafting
						responsive frontends, and deploying applications to the cloud. Along
						the way, I share what I learn; from designing efficient
						architectures and debugging tricky issues to setting up CI/CD
						pipelines and automating workflows. This is a space for curiosity,
						experimentation, and hands-on learning, whether you’re coding along,
						exploring new tech, or just here to see what breaks (and how to fix
						it).
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-bold mb-3 border-b border-gray-300 dark:border-zinc-700 pb-2">
						Experience
					</h2>
					<p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
						Managing classes of playful teenagers, and sometimes students older
						than me, taught me how to stay calm under pressure, adapt to
						different personalities, and communicate clearly to keep everyone
						engaged. I bring that same mindset to full-stack development:
						breaking down complex problems into manageable steps, collaborating
						on projects, debugging tricky issues, and turning challenges into
						learning opportunities.
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-bold mb-3 border-b border-gray-300 dark:border-zinc-700 pb-2">
						Skills
					</h2>
					<div className="space-y-4 text-gray-700 dark:text-gray-300">
						<div>
							<h3 className="font-semibold text-lg mb-1">💻 Backend</h3>
							<p>
								Python, Django, Django REST Framework, FastAPI, Celery,
								RabbitMQ, Redis, PostgreSQL, MySQL, GraphQL, SQLAlchemy, RESTful
								API design, unit testing, caching strategies, authentication &
								authorization, microservices architecture
							</p>
						</div>

						<div>
							<h3 className="font-semibold text-lg mb-1">🐳 DevOps & Tools</h3>
							<p>
								Docker, Docker Compose, Kubernetes, Shell scripting, Git, CI/CD
								pipelines (GitHub Actions), API deployment, server & process
								monitoring (Zabbix), environment management, container
								orchestration
							</p>
						</div>

						<div>
							<h3 className="font-semibold text-lg mb-1">
								🎨 Frontend (in progress)
							</h3>
							<p>
								HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind CSS,
								Styled Components, responsive design, component-based
								architecture, state management (React Query / React Context),
								form handling (React Hook Form + Zod), API integration (Axios /
								RESTful APIs), frontend performance optimization
							</p>
						</div>

						<div>
							<h3 className="font-semibold text-lg mb-1">🌱 Other Skills</h3>
							<p>
								Clear communication, thoughtful problem-solving, thorough
								documentation, mentoring mindset, patience and adaptability
							</p>
						</div>
					</div>
				</section>

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
