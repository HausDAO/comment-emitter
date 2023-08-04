import { useDHConnect } from "@daohaus/connect";
import { Buildable, WrappedTextArea } from "@daohaus/ui";
import { ComponentProps, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { keccak256, toHex } from 'viem'
import { TARGET } from "../../targetDao";
import { EmitData } from "../../hooks/usePoster";
import { EthAddress } from "@daohaus/utils";
import { useParams } from "react-router-dom";


export const EmitContentData  = (props: Buildable<{}>) => {
  const { address } = useDHConnect();
  const { emitTag } = useParams();

  const { watch, setValue } = useFormContext();
  const [emitContent, link] = watch([
    "emitContent",
    "link",

  ]);

  // TODO
  // add uuid and sender address to tag
  // this is added in the contract as well
  // allows to verify that the content was created by the sender
  // uuid is a salt for a unique hash
  // this does not prevent a user from submitting the same salt again
  //  - maybe this is a feature for delete/edit, only using the most recent

  const uuid = uuidv4();
  const tag = `${TARGET.DOMAINID}:${uuid}:${address}`;
  const encodedData = keccak256(toHex(tag));


  useEffect(() => {
    
    if(!emitContent) {
      return
    }
    const contentData: EmitData = {
      content: emitContent,
      version: "0.0.01",
      context: emitTag ? "reply" : "root",
      sender: address as EthAddress,
      link: link || "",
      created: Date.now() / 1000,
      id: uuid,
      domain: TARGET.DOMAINID,
      tag: encodedData,
      parent: emitTag || "",
    }

    setValue(
      "emitContentData",
      JSON.stringify(contentData)
    );
  }, [emitContent, link]);


  return (
    null
  );
};
