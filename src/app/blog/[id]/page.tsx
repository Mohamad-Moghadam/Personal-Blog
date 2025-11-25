import { Post } from "../types/Post";

const fakePosts: Post[] = [
	{
		id: 1,
		title: "Welcome to My Blog",
		excerpt: "This is the first post...",
		date: "2025-01-01",
		content: "Full content of the first post...",
	},
];

export default function BlogDetail({ params }: any) {
	const post = fakePosts.find((p) => p.id == params.id);

	if (!post) return <p>Post Not Found</p>;

	return (
		<div className="p-6">
			<h1 className="text-3xl font-bold">{post.title}</h1>
			<p className="text-gray-500">{post.date}</p>
			<p className="mt-4">{post.content}</p>
		</div>
	);
}
