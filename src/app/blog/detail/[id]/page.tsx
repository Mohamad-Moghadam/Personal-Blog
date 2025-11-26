import { Post } from "../../types/Post";

interface Props {
	params: { id: string };
}

export default async function BlogDetail({ params }: Props) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/Blog/detail/${params.id}/`
	);

	if (!res.ok) return <p className="text-red-500">Post not found</p>;

	const post: Post = await res.json();

	return (
		<div className="p-6 max-w-3xl mx-auto">
			<h1 className="text-3xl font-bold mb-2">{post.title}</h1>
			<p className="text-gray-500 mb-4">
				{new Date(post.created_at).toLocaleDateString()}
			</p>
			<p className="text-gray-800">{post.content}</p>
		</div>
	);
}
