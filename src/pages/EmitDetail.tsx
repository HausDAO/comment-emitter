import styled from "styled-components";

import { Card, Divider, SingleColumnLayout, widthQuery } from "@daohaus/ui";
import { EmitData, usePoster } from "../hooks/usePoster";
import { TARGET } from "../targetDao";
import { useParams } from "react-router-dom";
import { EmitOverview } from "../components/EmitOverview";

import { EmitReplyForm } from "./EmitReplyForm";

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

export const EmitDetail = () => {
  const { isIdle, isLoading, error, data, refetch } = usePoster({
    emitterAddress: TARGET.EMITTER_ADDRESS,
    chainId: TARGET.CHAIN_ID,
  });

  const { emitTag } = useParams();

  const rootEmit = data?.events.find((emit) => emit?.tag === emitTag);

  if (!rootEmit) return null;

  const replyEmits = data?.events.filter(
    (emit) => emit?.parent === rootEmit?.tag && emit.context === "reply"
  );
  const reactionEmits = data?.events.filter(
    (emit) => emit?.parent === rootEmit?.tag && emit.context === "reaction"
  );

  return (
    <SingleColumnLayout>
      <EmitContainer key={rootEmit.id}>
        <EmitOverview post={rootEmit} root={true} />
      </EmitContainer>
      <Divider />
      {replyEmits?.map((post: EmitData) => {
        if (!post || !post?.content || !post?.tag || !post?.id) return null;

        return (
          <EmitContainer key={post.id}>
            <EmitOverview post={post} />
          </EmitContainer>
        );
      })}
      <EmitReplyForm />
    </SingleColumnLayout>
  );
};
