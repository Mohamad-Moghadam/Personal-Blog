"use client";
import { useEffect, useState } from "react";

export default function VisitorCounter() {
	const [total, setTotal] = useState(0);
	const [online, setOnline] = useState(0);

	const fetchVisitors = async () => {
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/Visitors/stats/`
			);
			const data = await res.json();
			setTotal(data.total);
			setOnline(data.online);
		} catch (err) {
			console.error("Failed to fetch visitors", err);
		}
	};

	useEffect(() => {
		fetchVisitors();
		const interval = setInterval(fetchVisitors, 10000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="text-center mt-4">
			<p>
				Total Visitors: <span className="font-bold">{total}</span>
			</p>
			<p>
				Online:
				<span className="font-bold inline-block ml-1 animate-bounce">
					{online}
				</span>
			</p>
		</div>
	);
}
