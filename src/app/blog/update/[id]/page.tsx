"use client";

import UpdatePostClient from "./UpdatePostClient";

export default function UpdatePostPage({ params }: { params: { id: string } }) {
	return <UpdatePostClient postId={params.id} />;
}
