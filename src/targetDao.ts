import { EthAddress } from "@daohaus/utils";

export type ValidNetwork =
  | "0x1"
  | "0x5"
  | "0x64"
  | "0xa"
  | "0x89"
  | "0xa4b1"
export type AddressKeyChain = {
  "0x1"?: string | undefined;
  "0x5"?: string | undefined;
  "0x64"?: string | undefined;
  "0xa"?: string | undefined;
  "0x89"?: string | undefined;
  "0xa4b1"?: string | undefined;
};

export const TARGET: 
{
  CHAIN_ID: ValidNetwork;
  EMITTER_ADDRESS: EthAddress;
  DOMAINID: string;
} = {
  CHAIN_ID: "0x5",
  EMITTER_ADDRESS: "0x94a173F0Fc3EB65452218f787D48febA9F287F7d",
  DOMAINID: "DAOHAUS"
}
