import UpdatePostClient from "./UpdatePostClient";

interface Params {
	id: string;
}

export default async function UpdatePostPage({ params }: { params: Params }) {
	return <UpdatePostClient postId={params.id} />;
}
