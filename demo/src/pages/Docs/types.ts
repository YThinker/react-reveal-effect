import { ReactNode } from "react";

export interface FieldListItem {
  fieldName: string,
  type: ReactNode,
  typeUrl?: string,
  description: string,
  default: string,
  version?: string,
  tips?: string
}