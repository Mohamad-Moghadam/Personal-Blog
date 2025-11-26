import BlogDetailClient from "./BlogDetailClient";

export default async function BlogDetailPage({ params }: any) {
	const resolved = await params;
	const id = Array.isArray(resolved.id) ? resolved.id[0] : resolved.id;

	if (!id)
		return (
			<p className="p-6 text-center text-red-500 font-semibold text-lg">
				Post ID missing
			</p>
		);

return (
	<div className="min-h-[100vh] flex flex-col">
		<BlogDetailClient postId={id} />
	</div>
);
}
