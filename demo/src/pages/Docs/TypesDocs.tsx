import { Typography, Link as MaterialLink } from '@mui/material'
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import DataGrid from '../../componnets/DataGrid'
import { TypePageHeaderStyles } from './constants'
import { FieldListItem } from './types';

const columnList: { field: keyof FieldListItem, title: string }[] = [{
  field: "fieldName",
  title: "Field Name"
}, {
  field: "type",
  title: "Type"
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

const typeDatas: FieldListItem[] = [{
  fieldName: "borderEffect",
  type: "boolean",
  description: "set to use border effect",
  default: "true",
  version: "",
}, {
  fieldName: "elementEffect",
  type: "boolean",
  description: "set to use element effect",
  default: "true",
  version: "",
}, {
  fieldName: "clickEffect",
  type: "boolean",
  description: "set to use click effect",
  default: "false",
  version: "",
}, {
  fieldName: "borderColor",
  type: "string",
  description: "set border effect's color",
  default: "rgba(255, 255, 255, 0.6)",
  version: "",
}, {
  fieldName: "elementColor",
  type: "string",
  description: "set element effect's color",
  default: "rgba(255, 255, 255, 0.3)",
  version: "",
}, {
  fieldName: "clickColor",
  type: "string",
  description: "set click effect's color",
  default: "rgba(255, 255, 255, 0.3)",
  version: "",
}, {
  fieldName: "borderGradientSize",
  type: "number",
  description: "set border effect's size",
  default: "150",
  version: "",
}, {
  fieldName: "elementGradientSize",
  type: "number",
  description: "set element effect's size",
  default: "150",
  version: "",
}, {
  fieldName: "clickGradientSize",
  type: "number",
  description: "set click effect's size",
  default: "80",
  version: "",
}, {
  fieldName: "stop",
  type: "boolean",
  description: "stop draw effect",
  default: "false",
  version: "3.0.0",
}, {
  fieldName: "effectType",
  type: '"background-image" | "border-image"',
  description: "use which css property to draw the light effect",
  default: '"background-image"',
  version: "3.1.0",
  tips: "'border-image' is supported in IE11 or later"
}];

const effectConfigTypeDatas: FieldListItem[] = [{
  fieldName: "root",
  type: '? HTMLElement | Window | null',
  description: "",
  default: 'null',
  version: "3.2.0",
  tips: <>
    try to use RevealEffectConstructor.globalRoot instead of this config property, and only use it when you need to customize root, as it has poor performance
    <br />
    when globalRoot and config root are not used, you can draw effect manually using instance.draw(x, y)
  </>
}];

const selectorDatas: FieldListItem[] = [{
  fieldName: "borderSelector",
  type: "? EffectElementRef | EffectElementRefs | HTMLElement | null | HTMLElement[]",
  description: "add effect on these border elemenets",
  default: "",
  version: "",
}, {
  fieldName: "elementSelector",
  type: "? EffectElementRef | EffectElementRefs | HTMLElement | null | HTMLElement[]",
  description: "add effect on these main elemenets",
  default: "",
  version: "",
}];

const TypesDocs = () => {
  const location = useLocation();

  useEffect(() => {
    if(location.hash) {
      document.querySelector(location.hash)?.scrollIntoView();
    }
  }, [location]);


  return (
    <>
      <Typography variant="h3" component="h3" sx={TypePageHeaderStyles}>
        Types
      </Typography>
      <Typography variant="h4" component="h4" id="GlobalEffectConfigType" sx={TypePageHeaderStyles}>
        # GlobalEffectConfigType
      </Typography>
      <DataGrid<FieldListItem> keyField="index"
        columns={columnList}
        data={typeDatas}
      />
      <Typography variant="h4" component="h4" id="EffectConfigType" sx={TypePageHeaderStyles}>
        # EffectConfigType <Typography variant='body1'>(extends <MaterialLink component={Link} to='#GlobalEffectConfigType'>Partial{'<'}GlobalEffectConfigType{'>'}</MaterialLink>)</Typography>
      </Typography>
      <DataGrid<FieldListItem> keyField="index"
        columns={columnList}
        data={effectConfigTypeDatas}
      />
      <Typography variant="h4" component="h4" id="Selector" sx={TypePageHeaderStyles}>
        # Selector
      </Typography>
      <DataGrid<FieldListItem> keyField="index"
        columns={columnList}
        data={selectorDatas}
      />
    </>
  )
}

export default TypesDocs