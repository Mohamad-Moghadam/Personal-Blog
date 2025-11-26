import BlogDetailClient from "./BlogDetailClient";

interface PageParams {
	id: string;
}

interface PageProps {
	params: PageParams;
}

export default function BlogDetailPage({ params }: PageProps) {
	const postId = Array.isArray(params.id) ? params.id[0] : params.id;
	if (!postId) return <p className="p-6 text-red-500">Post ID missing</p>;

	return <BlogDetailClient postId={postId} />;
}
