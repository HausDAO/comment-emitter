import { FIELD } from "@daohaus/moloch-v3-legos";
import { CustomFormLego } from "./fieldConfig";
import { APP_FIELD } from "./fields";
import { APP_TX } from "./tx";
import { TXLego } from "@daohaus/utils";

export const APP_FORM: Record<string, CustomFormLego> = {
  EMIT: {
    id: "EMIT",
    title: "",
    subtitle: "immutable forever.",
    description: "",
    requiredFields: { emitContent: true },
    log: true,
    tx: APP_TX.EMIT as TXLego,
    fields: [
      { ...FIELD.LINK, id: "link", label: "External Link" },
      { ...APP_FIELD.EMITCONTENT, id: "emitContent", label: "Content"  }, 
      APP_FIELD.EMITCONTENTDATA     
    ],
  },
  EMITREPLY: {
    id: "EMITREPLY",
    title: "",
    subtitle: "reply",
    description: "",
    requiredFields: { emitContent: true },
    log: true,
    tx: APP_TX.EMIT as TXLego,
    fields: [
      { ...APP_FIELD.EMITCONTENT, id: "emitContent", label: "Content"  }, 
      APP_FIELD.EMITCONTENTDATA     
    ],
  },
};

