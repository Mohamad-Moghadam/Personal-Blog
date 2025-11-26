"use client";

import BlogDetailClient from "./BlogDetailClient";

export default function BlogDetailPage({
	params,
}: {
	params: { id: string | string[] };
}) {
	if (!params?.id) return <p className="p-6 text-red-500">Post ID missing</p>;

	const postId = Array.isArray(params.id) ? params.id[0] : params.id;

	return <BlogDetailClient postId={postId} />;
}
