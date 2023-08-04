import styled from "styled-components";

import { Card, H2, Link, ParMd, SingleColumnLayout, widthQuery } from "@daohaus/ui";
import { HausAnimated } from "../components/HausAnimated";
import { StyledRouterLink } from "../components/Layout";
import { TARGET } from "../targetDao";
import { useDHConnect } from "@daohaus/connect";
import { EmitData, usePoster } from "../hooks/usePoster";
import { EthAddress } from "@daohaus/utils";
import { EmitOverview } from "../components/EmitOverview";
import { EmitForm } from "./EmitForm";


  const EmitContainer = styled(Card)`
  padding: 3rem;
  width: 100%;
  border: none;
  margin-bottom: 3rem;
  @media ${widthQuery.lg} {
    max-width: 100%;
    min-width: 0;
  }
`;

export const Home = () => {
  const { address } = useDHConnect();
  const { isIdle, isLoading, error, data, refetch } = usePoster({
    emitterAddress: TARGET.EMITTER_ADDRESS,
    chainId: TARGET.CHAIN_ID 
  });

  if (isLoading) return <ParMd>Loading...</ParMd>;
  if (!data) return <ParMd>No data</ParMd>;


  return (
    <SingleColumnLayout>
      <HausAnimated />
      <EmitForm/>
      {data?.eventsReverse.map((post: EmitData) => {
        if(!post || !post?.content || !post?.tag || !post?.id || post.context === "reaction" ) return null;
        return (
      <EmitContainer key={post.id}>
        <EmitOverview post={post} root={true} home={true} />
      </EmitContainer>
      )})}

    </SingleColumnLayout>
  );
};
