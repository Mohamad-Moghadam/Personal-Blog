"use client";

import { useEffect, useState } from "react";

export default function VisitorStats() {
	const [total, setTotal] = useState(0);
	const [online, setOnline] = useState(0);

	const fetchStats = async () => {
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/Visitors/stats/`
			);
			if (!res.ok) throw new Error("Failed to fetch visitor stats");
			const data = await res.json();
			setTotal(data.total);
			setOnline(data.online);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchStats();

		const interval = setInterval(fetchStats, 10000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="mt-2 text-gray-400 text-sm flex justify-center gap-4">
			<span>
				Total visitors: <strong>{total}</strong>
			</span>
			<span>
				Online now: <strong>{online}</strong>
			</span>
		</div>
	);
}
