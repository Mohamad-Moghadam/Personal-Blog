import { Post } from "../../types/Post";

export default async function BlogDetail({ params }: any) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/Blog/${params.id}`
	);
	if (!res.ok) return <p>Post not found</p>;
	const post: Post = await res.json();

	return (
		<div className="p-6">
			<h1 className="text-3xl font-bold">{post.title}</h1>
			<p className="text-gray-500">
				{new Date(post.created_at).toLocaleDateString()}
			</p>
			<p className="mt-4">{post.content}</p>
		</div>
	);
}
