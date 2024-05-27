import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Input } from "@nextui-org/input";

interface Column {
  key: string;
  label: string;
}

interface DynamicTableProps {
  columns: Column[];
  data: any[];
}

const DynamicTable: React.FC<DynamicTableProps> = ({ columns, data }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter(
    (item: any) =>
      item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="px-5 m-5">
        <Input
          type="text"
          label="Search by name"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="px-5 m-5">
        <Table aria-label="Dynamic table">
          <TableHeader className="text-center">
            {columns.map((column, index) => (
              <TableColumn
                className="text-center"
                key={`${column.key}-${index}`}
              >
                {column.label}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {filteredData.map((item: any, index) => (
              <TableRow key={`${item._id}-${index}`}>
                {columns.map((column, colIndex) => (
                  <TableCell key={`${String(column.key)}-${colIndex}`}>
                    {item[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DynamicTable;
