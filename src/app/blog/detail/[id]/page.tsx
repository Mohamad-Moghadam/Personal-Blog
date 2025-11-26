// src/app/blog/detail/[id]/page.tsx
import BlogDetailClient from "./BlogDetailClient";

interface PageProps {
	params: { id: string };
}

export default function BlogDetailPage({ params }: PageProps) {
	return <BlogDetailClient postId={params.id} />;
}
