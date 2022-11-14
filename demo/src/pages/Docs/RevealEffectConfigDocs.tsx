import { Typography, Link as MaterialLink } from '@mui/material'
import { Link } from 'react-router-dom';
import DataGrid, { GridColumn } from '../../componnets/DataGrid'
import { TypePageHeaderStyles } from './constants'
import { FieldListItem } from './types';

const columnList: GridColumn<FieldListItem>[] = [{
  field: "fieldName",
  title: "Field Name",
  render(value) {
    if(['mountOnBody', 'component'].includes(value as string)) {
      return <Typography component='del'>{value}</Typography>
    }
    return value;
  }
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
  type: <MaterialLink component={Link} to="/docs/types#GlobalEffectConfigType">GlobalEffectConfigType</MaterialLink>,
  description: "effects' style config",
  default: "",
  version: "",
}, {
  fieldName: "mountOnBody",
  type: "? boolean",
  description: "mousemove event listener mount on document body or not",
  default: "true",
  version: "2.0.0",
  tips: 'v3.2.0 deprecated'
}, {
  fieldName: "component",
  type: "? ElementType",
  description: "The component used for the root node. Either a string to use a HTML element or a component. It only works when mountOnBody is true",
  default: "",
  version: "2.0.0",
  tips: 'v3.2.0 deprecated'
}, {
  fieldName: "off",
  type: "? boolean",
  description: "unmount globalRoot's event listener",
  default: "",
  version: "3.0.0",
}, {
  fieldName: "globalRoot",
  type: "? HTMLElement | Window | null",
  description: "",
  default: "window",
  version: "3.2.0",
}];

const RevealEffectConfigDocs = () => {
  return (
    <>
      <Typography variant="h3" component="h3" sx={TypePageHeaderStyles}>
        RevealEffectConfig
      </Typography>
      <Typography variant="h4" component="h4" id="Parameters" sx={TypePageHeaderStyles}>
        # Parameters
      </Typography>
      <DataGrid<FieldListItem> keyField="index"
        columns={columnList}
        data={hookDatas}
      />
    </>
  )
}

export default RevealEffectConfigDocs