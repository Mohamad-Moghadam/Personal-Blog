import BlogDetailClient from "./BlogDetailClient";

interface PageProps {
	params: { id: string | string[] };
}

export default function BlogDetailPage({ params }: PageProps) {
	if (!params?.id) return <p className="p-6 text-red-500">Post ID missing</p>;

	const postId = Array.isArray(params.id) ? params.id[0] : params.id;

	return <BlogDetailClient postId={postId} />;
}
