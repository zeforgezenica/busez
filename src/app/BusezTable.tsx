import React, { useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import {Input} from "@nextui-org/input";


const rows = [
	{
	  key: "1",
	  vrijeme_polaska: "05:25",
	  stanica: "Gladovići",
	  vrijeme_povratka: "06:38",
	},
	{
		key: "2",
		vrijeme_polaska: "05:33",
		stanica: "Bečin potok",
		vrijeme_povratka: "--",
	},
	{
		key: "3",
		vrijeme_polaska: "Zoey Lang",
		stanica: "Gladovići",
		vrijeme_povratka: "Paused",
	},
	{
		key: "4",
		vrijeme_polaska: "Zoey Lang",
		stanica: "Gladovići",
		vrijeme_povratka: "Paused",
	},
];

const columns = [
	{
	  key: "vrijeme_polaska",
	  label: "VRIJEME POLASKA",
	},
	{
	  key: "stanica",
	  label: "STANICA",
	},
	{
	  key: "vrijeme_povratka",
	  label: "VRIJEME POVRATKA",
	},
];

const BusezTable = () => {
	const [searchTerm, setSearchTerm] = useState("");

	const filteredRows = rows.filter((row) =>
		row.stanica.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div>
			<div className="px-5 m-5">
				<Input type="text" label="Upišite gdje želite ići" onChange={(e) => setSearchTerm(e.target.value)}></Input>
			</div>
			<div className="px-5 m-5">
        		<h3 className="text-l text-left mb-2">Gladovići - Koprivna - Zenica AS</h3>
				<Table aria-label="Example table with dynamic content">
					<TableHeader className="text-center">
							{columns.map((column) =>
								<TableColumn className="text-center" key={column.key}>{column.label}</TableColumn>
							)}
					</TableHeader>
				<TableBody>
					{filteredRows.map((row) =>
						<TableRow key={row.key}>
							{(columnKey) => <TableCell>{getKeyValue(row, columnKey)}</TableCell>}
						</TableRow>
					)}
				</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default BusezTable;
