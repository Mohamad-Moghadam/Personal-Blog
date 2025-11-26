import BlogDetailClient from "./BlogDetailClient";
import { PageProps } from "next/app";

interface Props {
	params: { id: string };
}

export default function BlogDetailPage({ params }: Props) {
	const postId = params.id;
	if (!postId) return <p className="p-6 text-red-500">Post ID missing</p>;

	return <BlogDetailClient postId={postId} />;
}
