import { FormBuilder } from "@daohaus/form-builder";
import { MolochFields } from "@daohaus/moloch-v3-fields";

import { APP_FORM } from "../legos/forms";

import { AppFieldLookup } from "../legos/fieldConfig";
import { TARGET } from "../targetDao";

export const FormTest = () => {
  return (
    <FormBuilder
      form={APP_FORM.EMIT}
      targetNetwork={TARGET.CHAIN_ID}
      customFields={{ ...MolochFields, ...AppFieldLookup }}
    />
  );
};