import { ContractLego } from "@daohaus/utils";
import { TARGET } from "../targetDao";
import EMITTER from "../abis/emitter.json";


export const APP_CONTRACT: Record<string, ContractLego> = {
  EMITTER:  {
    type: "static",
    contractName: "EMITTER",
    abi: EMITTER,
    targetAddress: TARGET.EMITTER_ADDRESS,
  },
};
