import styled from "styled-components";

import { SingleColumnLayout } from "@daohaus/ui";
import { FormBuilder } from "@daohaus/form-builder";
import { APP_FORM } from "../legos/forms";
import { TARGET } from "../targetDao";
import { MolochFields } from "@daohaus/moloch-v3-fields";
import { AppFieldLookup } from "../legos/fieldConfig";
import { Link } from "react-router-dom";

const LinkBox = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
`;

export const EmitForm = () => {

  return (
    <SingleColumnLayout>
      <FormBuilder
        form={APP_FORM.EMIT}
        targetNetwork={TARGET.CHAIN_ID}
        customFields={{ ...MolochFields, ...AppFieldLookup }}
      />
      <Link to="/emit">Fullscreen</Link>
    </SingleColumnLayout>
  );
};
