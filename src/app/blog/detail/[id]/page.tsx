"use client";

import { useParams } from "next/navigation";
import BlogDetailClient from "./BlogDetailClient";

export default function BlogDetailPage() {
	const params = useParams();
	if (!params?.id) return <p className="p-6 text-red-500">Post ID missing</p>;

	return <BlogDetailClient postId={params.id} />;
}
