import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  AddressDisplay,
  Card,
  H4,
  Theme,
  DataIndicator,
  widthQuery,
  Tag,
  ParMd,
  Button,
  LinkStyles,
} from "@daohaus/ui";
import { ZERO_ADDRESS } from "@daohaus/utils";
import { Keychain } from "@daohaus/keychain-utils";

import { EmitData } from "../hooks/usePoster";
import { EmitMenu, StyledExternalLink } from "./EmitMenu";
import { TARGET } from "../targetDao";
import { MemberProfile } from "./MemberProfile";
import ReactMarkdown from "react-markdown";
import { RiAttachmentLine } from "react-icons/ri";
import { Dooter } from "./Dooter";

const VaultOverviewCard = styled(Card)`
  background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step3};
  border: none;
  padding: 3rem;
  width: 100%;
`;

const VaultCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 3rem;

  .content-section {
    width: 90%;
  }

  .right-section {
    display: flex;
  }

  .safe-link {
    padding: 0.9rem;
    background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step5};
    border-radius: 4px;
  }
`;

const ReactMArkDownContainer = styled.div`
  font-size: 1.4rem;
  border: 1px solid #000;
  background-color: rgba(0, 0, 0, 0.1);
`;

const InlineImgAndText = styled.div`
    display: flex;
    align-items: center;
    gap: 1.8rem;
    margin-bottom: 1.8rem;
    }   
`;

const DataGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-content: space-between;
  div {
    padding: 0.5rem 0;
    width: 19.7rem;

    @media ${widthQuery.sm} {
      min-width: 100%;
    }
  }
`;

const TagSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.8rem;
`;

const ExternalLinkIcon = styled(RiAttachmentLine)`
  color: ${({ theme }: { theme: Theme }) => theme.primary.step10};
  font-size: 10rem;

  :hover {
    color: ${({ theme }: { theme: Theme }) => theme.primary.step12};
    cursor: pointer;
  }
`;

type EmitProps = {
  post: EmitData;
  root?: boolean;
  home?: boolean;
};

export const EmitOverview = ({ post, root, home }: EmitProps) => {
  return (
    <VaultOverviewCard>
      <VaultCardHeader>
        <div className="content-section">
          {post.created &&
            `${new Date(post.created * 1000).toLocaleDateString()} ${new Date(
              post.created * 1000
            ).toLocaleTimeString()}`}
          <InlineImgAndText>
            {post.link && (
              <Link to={post.link}>
                <ExternalLinkIcon />
              </Link>
            )}
            <ReactMArkDownContainer>
              <ReactMarkdown>
                {post.content.length > 140 && home
                  ? post.content.substring(0, 140)
                  : post.content}
              </ReactMarkdown>
              {post.content.length > 140 && home && (
                <Link to={`/emit/${post.tag}`}>
                  <Button size={"sm"} variant="ghost">
                    Read More...
                  </Button>
                </Link>
              )}
            </ReactMArkDownContainer>
          </InlineImgAndText>
          <TagSection>
            <MemberProfile address={post.sender || ZERO_ADDRESS} />
            <AddressDisplay
              address={post.sender || ZERO_ADDRESS}
              truncate
              copy
              explorerNetworkId={TARGET.CHAIN_ID as keyof Keychain}
            />

            {post.context === "reply" ? (
              <>
                <Tag tagColor="green">{post.context}</Tag>
                {home && (
                  <Link to={`/emit/${post.parent}`}>
                    <Button size={"sm"} variant="ghost">
                      View Parent
                    </Button>
                  </Link>
                )}
              </>
            ) : (
              <>
                <Tag tagColor="pink">{post.context}</Tag>
                {home && (
                  <Link to={`/emit/${post.tag}`}>
                    <Button size={"sm"} variant="ghost">
                      Replies
                    </Button>
                  </Link>
                )}
              </>
            )}
          </TagSection>
        </div>
        <div className="right-section">
          {root && <EmitMenu emitId={post.tag} />}
        </div>
      </VaultCardHeader>

      <div className="action-section">
        <Dooter parent={post.tag} />
      </div>
    </VaultOverviewCard>
  );
};
