import BlogDetailClient from "./BlogDetailClient";

// Next.js 16 automatically provides `params` with the dynamic route key ([id])
export default function BlogDetailPage({ params }: any) {
	const postId = Array.isArray(params.id) ? params.id[0] : params.id;

	if (!postId) return <p className="p-6 text-red-500">Post ID missing</p>;

	return <BlogDetailClient postId={postId} />;
}
