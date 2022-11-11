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
  fieldName: "selector",
  type: "Selector",
  typeUrl: "/docs/types#Selector",
  description: "add effects on these elements",
  default: "",
  version: "",
  tips: `when effectType is "border-image", this paramter only has elementSelector property`
}, {
  fieldName: "config",
  type: "EffectConfigType",
  typeUrl: "/docs/types#EffectConfigType",
  description: "effect's config, which has a higher priority than global config",
  default: "",
  version: "",
}];

const returnDatas: FieldListItem[] = [{
  fieldName: "revealEffectInstance",
  type: "RevealEffectConstructor",
  typeUrl: "/docs/reveal-effect-constructor#Returns",
  description: "RevealEffectConstructor's instance",
  default: "",
  version: "3.2.0",
}];

const UseRevealEffectDocs = () => {
  return (
    <>
      <Typography variant="h3" component="h3" sx={TypePageHeaderStyles}>
        useRevealEffect
      </Typography>
      <Typography variant="h4" component="h4" id="useRevealEffectParameter" sx={TypePageHeaderStyles}>
        # Parameters
      </Typography>
      <DataGrid<FieldListItem> keyField="index"
        columns={columnList}
        data={hookDatas}
      />
      <Typography variant="h4" component="h4" id="Returns" sx={TypePageHeaderStyles}>
        # Returns
      </Typography>
      <DataGrid<FieldListItem> keyField="index"
        columns={columnList}
        data={returnDatas}
      />
    </>
  )
}

export default UseRevealEffectDocs