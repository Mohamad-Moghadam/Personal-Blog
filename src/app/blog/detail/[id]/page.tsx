import BlogDetailClient from "./BlogDetailClient";

export default async function BlogDetailPage({ params }: any) {
	const resolved = await params;
	const id = Array.isArray(resolved.id) ? resolved.id[0] : resolved.id;

	if (!id) return <p className="p-6 text-red-500">Post ID missing</p>;

	return <BlogDetailClient postId={id} />;
}
