import { Typography, Link as MaterialLink } from '@mui/material'
import { Link } from 'react-router-dom';
import DataGrid, { GridColumn } from '../../componnets/DataGrid'
import { TypePageHeaderStyles } from './constants'
import { FieldListItem } from './types';

const columnList: GridColumn<FieldListItem>[] = [{
  field: "fieldName",
  title: "Field Name"
}, {
  field: "type",
  title: "Type",
  render(value, row) {
    if(row?.typeUrl) {
      return <MaterialLink component={Link} to={row.typeUrl}>{value}</MaterialLink>
    }
    return value;
  }
},{
  field: "description",
  title: "Description"
},{
  field: "default",
  title: "Default"
},{
  field: "version",
  title: "Version"
},{
  field: "tips",
  title: "tips"
}];

const hookDatas: FieldListItem[] = [{
  fieldName: "config",
  type: <>
    {"{"}<br />
    &nbsp;&nbsp;&nbsp;&nbsp;borderWidth: string|number,<br />
    &nbsp;&nbsp;&nbsp;&nbsp;effectBoxSizing: "content-box" | "border-box" | "safe"<br />
    {`} & `}
    <MaterialLink component={Link} to="/docs/types#GlobalEffectConfigType">{`Partial<GlobalEffectConfigType>`}</MaterialLink>
  </>,
  description: "effects' style config",
  default: "{ borderWidth: 1px, effectBoxSizing: 'content-box' }",
  version: "",
  tips: `RevealEffect component doesn't support "border-image" effectType`
}, {
  fieldName: "borderStyle",
  type: "? CSSProperties | undefined",
  description: "border effect element's style property",
  default: "",
  version: "1.2.0",
}, {
  fieldName: "borderClassName",
  type: "? string | undefined",
  description: "border effect element's class property",
  default: "",
  version: "1.2.0",
}, {
  fieldName: "borderRef",
  type: "? MutableRefObject<HTMLDivElement | null>",
  description: "border effect element's reflect",
  default: "",
  version: "1.2.0",
}, {
  fieldName: "component",
  type: "ElementType",
  description: "The component used for the root node. Either a string to use a HTML element or a component",
  default: "",
  version: "2.0.0",
}];

const RevealEffectDocs = () => {
  return (
    <>
      <Typography variant="h3" component="h3" sx={TypePageHeaderStyles}>
        RevealEffect
      </Typography>
      <Typography variant="h4" component="h4" id="useRevealEffectParameter" sx={TypePageHeaderStyles}>
        # Parameters
      </Typography>
      <DataGrid<FieldListItem> keyField="index"
        columns={columnList}
        data={hookDatas}
      />
    </>
  )
}

export default RevealEffectDocs