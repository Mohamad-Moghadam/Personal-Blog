import BlogDetailClient from "./BlogDetailClient";

interface Props {
	params: {
		id: string;
	};
}

export default function BlogDetailPage({ params }: Props) {
	return <BlogDetailClient postId={params.id} />;
}
