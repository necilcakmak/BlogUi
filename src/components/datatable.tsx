import { DatatableProps } from "interfaces/datatableProps";
import DataTable from "react-data-table-component";

export const DataTableComp: React.FC<DatatableProps> = (props) => {
  const { columns, data } = props;

  return <DataTable columns={columns} data={data} pagination />;
};
