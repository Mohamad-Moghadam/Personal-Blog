// src/app/blog/[id]/page.tsx

import BlogDetailClient from "./BlogDetailClient";

export default function BlogDetailPage({
	params,
}: {
	params: { id: string | string[] };
}) {
	const postId = Array.isArray(params.id) ? params.id[0] : params.id;

	if (!postId) return <p className="p-6 text-red-500">Post ID missing</p>;

	// Render client component
	return <BlogDetailClient postId={postId} />;
}
