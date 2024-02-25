// import { DatatableProps } from "interfaces/datatableProps";
// import DataTable from "react-data-table-component";

// export const DataTableComp: React.FC<DatatableProps> = (props) => {
//   const { columns, data } = props;

//   return <DataTable columns={columns} data={data} pagination />;
// };

import React, { useState } from "react";

export interface TableColumn<T> {
  header: string;
  accessor: (row: T) => any;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onDelete: (index: number) => void; // Silme işlevi
}

export const DataTable = <T,>({ data, columns, onDelete }: TableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Arama fonksiyonu
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filtrelenmiş veri
  const filteredData = data.filter((item: any) =>
    Object.values(item).some(
      (value: any) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      <input
        type="text"
        className="form-control"
        placeholder="Ara..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <table className="table table-hover">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              {columns.map((column, index) => (
                <td key={index}>{column.accessor(row)}</td>
              ))}
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(index)}
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
