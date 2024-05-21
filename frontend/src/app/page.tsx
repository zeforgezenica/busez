"use client"

import BusezTable from "./BusezTable";

export default function Home() {
	return (
		<>
			<h1 className="text-3xl font-bold text-center mb-4">Busez</h1>
        	<h2 className="text-xl text-center mb-2">Aplikacija za prikaz informacija o redu vožnje javnog prevoza u Zenici.</h2>
			<BusezTable></BusezTable>
		</>
	);
}
