import React, { useEffect } from "react";

import { Button, Tag, useToast } from "@daohaus/ui";
import { EmitData, usePoster } from "../hooks/usePoster";
import { TARGET } from "../targetDao";
import { useDHConnect } from "@daohaus/connect";
import { APP_TX } from "../legos/tx";
import { useTxBuilder } from "@daohaus/tx-builder";
import { EthAddress, TXLego, handleErrorMessage } from "@daohaus/utils";
import { v4 as uuidv4 } from "uuid";
import { keccak256, toHex } from "viem";

export const Dooter = ({ parent }: { parent: string }) => {
  const { address } = useDHConnect();
  const { isIdle, isLoading, error, data, refetch } = usePoster({
    emitterAddress: TARGET.EMITTER_ADDRESS,
    chainId: TARGET.CHAIN_ID,
  });

  const [upDoots, setUpDoots] = React.useState(0);
  const [downDoots, setDownDoots] = React.useState(0);

  const { fireTransaction } = useTxBuilder();
  const { errorToast, defaultToast, successToast } = useToast();
  const [isTxLoading, setIsTxLoading] = React.useState(false);

  const handleUpDoot = () => {
    handleDoot({ parent, up: true });
  };

  const handleDownDoot = () => {
    handleDoot({ parent, up: false });
  };

  const handleDoot = ({ parent, up }: { parent: string; up: boolean }) => {
    const uuid = uuidv4();
    const tag = `${TARGET.DOMAINID}:${uuid}:${address}`;
    const encodedData = keccak256(toHex(tag));

    const contentData: EmitData = {
      content: up ? "up" : "down",
      version: "0.0.01",
      context: "reaction",
      sender: address as EthAddress,
      link: "",
      created: Date.now() / 1000,
      id: uuid,
      domain: TARGET.DOMAINID,
      tag: encodedData,
      parent: parent,
    };

    setIsTxLoading(true);
    fireTransaction({
      tx: APP_TX.EMITDOOT as TXLego,
      callerState: { content: JSON.stringify(contentData), userAddress: address },
      lifeCycleFns: {
        onTxError: (error) => {
          const errMsg = handleErrorMessage({
            error,
          });
          errorToast({ title: "Doot Failed", description: errMsg });
          setIsTxLoading(false);
        },
        onTxSuccess: () => {
          defaultToast({
            title: "Doot Success",
            description: "Your doot has been sent to the blockchain",
          });
          refetch();
          setIsTxLoading(false);
        },
      },
    });
  };

  useEffect(() => {
    if (!data) return;
    console.log("parent", data?.events.filter(
        (emit) => emit?.tag === parent
      ));
    console.log("data", data?.events.filter(
        (emit) => emit?.parent === parent
      ));
    
    const upDootsAll = data?.events.filter(
      (emit) => emit?.parent === parent && emit.content === "up"
    );
    const downDootsAll = data?.events.filter(
      (emit) => emit?.parent === parent && emit.content === "down"
    );

    let upMap = new Map();
    const upDoots = upDootsAll.forEach((emit) => {
        const sender: string = emit.sender.toString();
        
        upMap.set(sender, emit);
    }
    );
    let downMap = new Map();
    const downDoots = downDootsAll.forEach((emit) => {
        const sender: string = emit.sender.toString();

        downMap.set(sender, emit);
    }
    );

    setUpDoots(upMap.size);
    setDownDoots(downMap.size);
  }, [data]);

  return (
    <>
      <Tag tagColor="blue">
        <Button size="sm" variant="ghost" onClick={handleUpDoot}>
          up
        </Button>{" "}
        updoots {upDoots}
      </Tag>

      <Tag tagColor="blue">
        <Button size="sm" variant="ghost" onClick={handleDownDoot}>
          down
        </Button>{" "}
        downdoots {downDoots}
      </Tag>
    </>
  );
};
