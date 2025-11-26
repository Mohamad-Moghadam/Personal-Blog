export async function getNews() {
	const apiKey = process.env.NEXT_PUBLIC_NEWSDATA_API_KEY;
	const res = await fetch(
		`https://newsdata.io/api/1/latest?apikey=${apiKey}&q=technology`,
		{ next: { revalidate: 900 } } // 900 ثانیه = 15 دقیقه
	);

	if (!res.ok) {
		throw new Error("Failed to fetch news");
	}

	const data = await res.json();
	return data.results || [];
}
