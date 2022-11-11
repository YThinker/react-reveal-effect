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
  version: "3.2.0",
  tips: `when effectType is "border-image", this paramter only has elementSelector property`
}, {
  fieldName: "config",
  type: "EffectConfigType",
  typeUrl: "/docs/types#EffectConfigType",
  description: "effect's config",
  default: "",
  version: "3.2.0",
  tips: "it won't merge with RevealEffectConfig's global config"
}];

const returnDatas: FieldListItem[] = [{
  fieldName: "config",
  type: "EffectConfigType",
  typeUrl: "/docs/types#EffectConfigType",
  description: "effect's config",
  default: "",
  version: "3.2.0",
}, {
  fieldName: "draw",
  type: "(pageX, pageY) => void",
  description: "manually draw effect on element",
  default: "",
  version: "3.2.0",
}, {
  fieldName: "stop",
  type: "() => void",
  description: "stop draw",
  default: "",
  version: "3.2.0",
}, {
  fieldName: "start",
  type: "() => void",
  description: "start draw",
  default: "",
  version: "3.2.0",
}, {
  fieldName: "off",
  type: "() => void",
  description: "remove all event listener mounted by this instance and clear all effect drawn by this instance",
  default: "",
  version: "3.2.0",
}, {
  fieldName: "removeChildrenEventListener",
  type: "() => void",
  description: "",
  default: "",
  version: "3.2.0",
}, {
  fieldName: "removeChildrenBorderEventListener",
  type: "() => void",
  description: "",
  default: "",
  version: "3.2.0",
}, {
  fieldName: "clearAllBackgroundEffect",
  type: "() => void",
  description: "",
  default: "",
  version: "3.2.0",
}, {
  fieldName: "clearAllBorderEffect",
  type: "() => void",
  description: "",
  default: "",
  version: "3.2.0",
}, ];

const staticDatas: FieldListItem[] = [{
  fieldName: "globalRoot",
  type: "? HTMLElement | Window | null",
  description: "",
  default: "",
  version: "3.2.0",
  tips: `when globalRoot and config root are not used, you can draw effect manually using instance.draw(x, y)`
}, {
  fieldName: "mount",
  type: "() => void",
  description: "mount mouse event listeners on globalRoot",
  default: "",
  version: "3.2.0",
  tips: "tt executes automatically when globalRoot is assigned a value"
}, {
  fieldName: "unmount",
  type: "() => void",
  description: "unmount globalRoot's mouse event listeners",
  default: "",
  version: "3.2.0",
}];

const RevealEffectConfigDocs = () => {
  return (
    <>
      <Typography variant="h3" component="h3" sx={TypePageHeaderStyles}>
        RevealEffect
      </Typography>
      <Typography variant="h4" component="h4" id="Parameters" sx={TypePageHeaderStyles}>
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
      <Typography variant="h4" component="h4" id="StaticProperties" sx={TypePageHeaderStyles}>
        # Static Properties
      </Typography>
      <DataGrid<FieldListItem> keyField="index"
        columns={columnList}
        data={staticDatas}
      />
    </>
  )
}

export default RevealEffectConfigDocs