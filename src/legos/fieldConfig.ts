import { CoreFieldLookup } from "@daohaus/form-builder";
import { MolochFields } from "@daohaus/moloch-v3-fields";
import { FieldLegoBase, FormLegoBase } from "@daohaus/utils";
import { TestField } from "../components/customFields/fieldTest";
import { EmitContentData } from "../components/customFields/emitContentData";

export const AppFieldLookup = {
  ...MolochFields,
  testField: TestField,
  emitContentData: EmitContentData,  

};

export type CustomFieldLego = FieldLegoBase<typeof AppFieldLookup>;
export type CustomFormLego = FormLegoBase<typeof AppFieldLookup>;
