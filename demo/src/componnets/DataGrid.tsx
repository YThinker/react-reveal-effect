import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Key, ReactNode } from "react";

export interface GridColumn<D> {
  field: keyof D;
  title: string;
  render?: (value: D[GridColumn<D>["field"]], row: D, index: number) => ReactNode;
}
export interface DataGridProps<D> {
  columns: GridColumn<D>[];
  data: Array<D>;
  keyField?: keyof D | "index";
}

type DataGridComponent = <D>(props: DataGridProps<D>) => JSX.Element
const DataGrid: DataGridComponent = (props) => {
  const { columns, data, keyField = "index" } = props;

  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((col, index) => (
            <TableCell key={index}>{col.title}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item, index) => {
          let key: Key = index;
          if(keyField !== "index"){
            const keyFieldValue = item[keyField];
            if(typeof keyFieldValue === "number" || typeof keyFieldValue === "string"){
              key = keyFieldValue;
            }
          }
          return (<TableRow key={key}>
            {columns.map((col, colIndex) => (
              <TableCell key={colIndex}>{
                col?.render ?
                  col.render(item[col.field], item, index) :
                  item[col.field]
              }</TableCell>
            ))}
          </TableRow>)
        })}
      </TableBody>
    </Table>
  )
}

export default DataGrid