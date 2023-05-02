import React, { useState } from "react";

const Table = ({ headers, rowData }) => {
  const [marks, setMarks] = useState({});

  const handleChangeMark = (event, row) => {
    const updatedMarks = { ...marks };
    updatedMarks[row.id] = event.target.value;
    setMarks(updatedMarks);
  };

  const handleSubmitMark = (event, row, mark) => {
    event.preventDefault();
    // Submit the mark value to the server and update the row's mark
  };

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

        <tbody className="divide-y divide-slate-600/50">
          {rowData?.map((row) => (
            <tr key={row.id}>
              {headers?.map((header) => (
                <td className="table-td" key={header.rowField || header.header}>
                  {typeof header.rowField === "function"
                    ? header.rowField(
                        row,
                        marks[row.id],
                        handleChangeMark,
                        handleSubmitMark
                      )
                    : row[header.rowField]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </>
    </table>
  );
};

export default Table;
