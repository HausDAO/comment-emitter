import { useQuery } from "react-query";

import { ValidNetwork, Keychain } from "@daohaus/keychain-utils";
import POSTERABI from "../abis/poster.json"
import { EthAddress, createViemClient } from "@daohaus/utils";

type LogArg = {
    user: EthAddress;
    content: string;
    tag: string;
}
type LogFetch = {
    args: LogArg;
}
export type EmitData = {
    content: string;
    context: string;
    created: number;
    id: string;
    link: string;
    parent: string;
    sender: EthAddress;
    version: string;
    domain: string;
    scope?: string;
    tag: string;
}

const fetchPosterRecords = async ({
  emitterAddress,
  chainId,
  rpcs,
}: {
  emitterAddress: EthAddress | undefined | null;
  chainId: ValidNetwork;
  rpcs?: Keychain;
}) => {
  if (!emitterAddress || !chainId) {
    throw new Error("No emitter address provided");
  }
  const client = createViemClient({
    chainId,
    rpcs,
  });

  try {
    const filter = await client.createContractEventFilter({
        abi: POSTERABI,
        address: "0x000000000000cd17345801aa8147b8d3950260ff",
        eventName: 'NewPost',
        fromBlock: 9451830n ,
        toBlock: 'latest',
        args: { 
            user: emitterAddress,
          }
      })

    const logs = await client.getFilterLogs({ filter }) as unknown as LogFetch[];
    console.log("logs", logs);
    
    const events: EmitData[] = logs.map((log: LogFetch) => {
        try {
            return JSON.parse(log.args.content)
        } catch (error) {
            console.log(error);
            return "";
        }
    })

    console.log("events", events);
   
    return {
      eventsReverse: events.reverse(),      
      events: events,

    };
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.message as string);
  }
};

export const usePoster = ({
  emitterAddress,
  chainId,
  rpcs,
}: {
  emitterAddress: EthAddress | undefined | null;
  chainId: ValidNetwork;
  rpcs?: Keychain;
}) => {
  const { data, ...rest } = useQuery(
    ["posterData", { emitterAddress }],
    () =>
      fetchPosterRecords({
        emitterAddress: emitterAddress,
        chainId,
        rpcs,
      }),
    { enabled: !!emitterAddress }
  );

//   // Group the parsed records by user and count the number of records for each user
//   const addCount = parsed?.map((record: any) => {
//     const count = parsed.filter((parsed) => record.user === parsed.user).length;
//     return { user: record.user, count };
//   });

//   // Sort the addCount array by count and filter out duplicate user entries
//   const leaderBoard = addCount
//     ?.filter((v, i, a) => a.findIndex((v2) => v2.user === v.user) === i)
//     .sort((a, b) => b.count - a.count);

  return {
    data,
    ...rest,
  };
};
