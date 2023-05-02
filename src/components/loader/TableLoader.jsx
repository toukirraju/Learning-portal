import { LoadingOverlay } from "@mantine/core";
import React from "react";

const TableLoader = ({ headers }) => {
  return (
    <table className="divide-y-1 text-base divide-gray-600 w-full ">
      <>
        <thead>
          <tr>
            {headers?.map((header) => (
              <th className="table-th" key={header.header}>
                {header.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-600/50 relative h-40 ">
          <LoadingOverlay
            visible
            overlayBlur={2}
            overlayOpacity={0.2}
            overlayColor="#c5c5c5"
            className="absolute rounded-md"
          />
        </tbody>
      </>
    </table>
  );
};

export default TableLoader;
