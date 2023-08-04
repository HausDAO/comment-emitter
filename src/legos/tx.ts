import { TXLegoBase } from "@daohaus/utils";
import { APP_CONTRACT } from "./contract";
import { TARGET } from "../targetDao";


export const APP_TX: Record<string, TXLegoBase> = {
  EMIT: {
    id: "EMIT",
    disablePoll: true,
    contract: APP_CONTRACT.EMITTER,
    method: "emitter",
    args: [
      ".formValues.emitContentData",      
      { type: "static", value: TARGET.DOMAINID },
    ],
  },
  EMITDOOT: {
    id: "EMITDOOT",
    disablePoll: true,
    contract: APP_CONTRACT.EMITTER,
    method: "emitter",
    args: [
      ".content",      
      { type: "static", value: TARGET.DOMAINID },
    ],
  },
  
};

export const ACTION_TX = {
  
}
