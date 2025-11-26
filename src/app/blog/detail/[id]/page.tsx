import BlogDetailClient from "./BlogDetailClient";

export default async function BlogDetailPage({ params }: any) {
	const id = Array.isArray(params.id) ? params.id[0] : params.id;

	if (!id)
		return (
			<div className="p-6 text-center text-red-500 font-semibold text-lg">
				Post ID missing
			</div>
		);

	return <BlogDetailClient postId={id} />;
}
