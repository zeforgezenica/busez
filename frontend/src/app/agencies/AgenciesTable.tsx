// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@nextui-org/react";
// import { Input } from "@nextui-org/input";
// import axios from "axios";

// interface Agency {
//   _id: number;
//   cityId: number;
//   name: string;
//   address: string;
//   website: string;
//   email: string;
//   phoneNumber: string;
// }

// const AgenciesTable = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [agencies, setAgencies] = useState<Agency[]>([]);

//   useEffect(() => {
//     const fetchAgencies = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/agencies");
//         console.log("Agencies:", response.data);
//         setAgencies(response.data);
//       } catch (error) {
//         console.error("Error fetching agencies:", error);
//       }
//     };
//     fetchAgencies();
//   }, []);

//   const filteredAgencies = agencies.filter((agency) =>
//     agency.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const columns: { key: keyof Agency; label: string }[] = [
//     { key: "_id", label: "ID" },
//     { key: "name", label: "Name" },
//     { key: "address", label: "Address" },
//     { key: "website", label: "Website" },
//     { key: "email", label: "Email" },
//     { key: "phoneNumber", label: "Phone Number" },
//   ];

//   return (
//     <div>
//       <div className="px-5 m-5">
//         <Input
//           type="text"
//           label="Search by name"
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>
//       <div className="px-5 m-5">
//         <h3 className="text-l text-left mb-2">Agencies</h3>
//         <Table aria-label="Agencies table">
//           <TableHeader className="text-center">
//             {columns.map((column) => (
//               <TableColumn className="text-center" key={column.key}>
//                 {column.label}
//               </TableColumn>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {filteredAgencies.map((agency) => (
//               <TableRow key={agency._id}>
//                 {columns.map((column) => (
//                   <TableCell key={column.key}>{agency[column.key]}</TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default AgenciesTable;
