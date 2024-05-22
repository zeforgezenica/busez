import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import axios from "axios";

interface Column {
  key: keyof any;
  label: string;
}

interface Props {
  apiUrl: string;
  columns: Column[];
}

const DynamicTable: React.FC<Props> = ({ apiUrl, columns }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        console.log("Data:", response.data);
        setData(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [apiUrl]);

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
        <h3 className="text-l text-left mb-2">Data</h3>
        <Table aria-label="Dynamic table">
          <TableHeader className="text-center">
            {columns.map((column) => (
              <TableColumn className="text-center" key={Number(column.key)}>
                {column.label}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {filteredData.map((item: any) => (
              <TableRow key={item._id}>
                {columns.map((column) => (
                  <TableCell key={String(column.key)}>
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
