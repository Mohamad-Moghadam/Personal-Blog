"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VisitorCounter() {
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

		const interval = setInterval(fetchStats, 5000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="mt-4 text-center">
			<p className="text-gray-700 dark:text-gray-300">
				Total visitors: <strong>{total}</strong>
			</p>

			<div className="mt-2 text-xl font-bold text-yellow-400">
				Online now:{" "}
				<AnimatePresence mode="wait">
					<motion.span
						key={online}
						initial={{ y: -10, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 10, opacity: 0 }}
						transition={{ type: "spring", stiffness: 300, damping: 20 }}
					>
						{online}
					</motion.span>
				</AnimatePresence>
			</div>
		</div>
	);
}
