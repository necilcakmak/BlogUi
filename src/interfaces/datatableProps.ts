export interface DatatableProps {
  columns: tableProps[];
  data: any;
}
interface tableProps {
  name: string;
  selector: any;
  sortable: boolean;
}
