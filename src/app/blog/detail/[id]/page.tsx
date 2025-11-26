import BlogDetailClient from "./BlogDetailClient";

export default function BlogDetailPage(props: any) {
	return <BlogDetailClient postId={props.params.id} />;
}
