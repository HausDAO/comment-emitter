import { useMemo } from "react";
import { RiMore2Fill } from "react-icons/ri/index.js";
import { Link as RouterLink } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import {
  DropdownMenu,
  DropdownItem,
  font,
  Theme,
  Button,
  DropdownIconTrigger,
  DropdownContent,
  DropdownLinkStyles,
  Divider,
  Link,
} from "@daohaus/ui";

export const RegistryMenuTrigger = styled(Button)`
  padding: 0 4px 0 4px;

  &[data-state="open"] {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  svg.icon-right {
    color: ${({ theme }: { theme: Theme }) => theme.primary.step9};
  }

  svg.icon-left {
    margin-right: 0;
    margin: 5rem;
  }
`;

// !Mark I believe this is supposed to be a RouterLink, but I'm not 100% sure
export const RegistryMenuLink = styled(RouterLink)`
  ${DropdownLinkStyles}
  font-weight: ${font.weight.bold};
`;

export const StyledExternalLink = styled(Link)`
  ${DropdownLinkStyles}
  font-weight: ${font.weight.bold};
`;

type EmitMenuProps = {};

export const EmitMenu = ({ emitId }: { emitId?: string }) => {
  const theme = useTheme();

  const enableActions = useMemo(() => {
    return true;
  }, []);

  if (!enableActions) return null;

  return (
    <DropdownMenu>
      <DropdownIconTrigger Icon={RiMore2Fill} size="sm" variant="ghost" />
      <DropdownContent>
        <>
          <DropdownItem key="bm" asChild>
            <RegistryMenuLink to={`/`}>
              none of this is wired up{" "}
            </RegistryMenuLink>
          </DropdownItem>
          <DropdownItem key="bm" asChild>
            <RegistryMenuLink to={`/`}>bookmark </RegistryMenuLink>
          </DropdownItem>
          {emitId && (
            <DropdownItem key="replies" asChild>
              <RegistryMenuLink to={`/emit/${emitId}`}>
                replies
              </RegistryMenuLink>
            </DropdownItem>
          )}
          <DropdownItem key="goto" asChild>
            <RegistryMenuLink to={`/`}>go to external link</RegistryMenuLink>
          </DropdownItem>
          <DropdownItem key="share" asChild>
            <RegistryMenuLink to={`/`}>share</RegistryMenuLink>
          </DropdownItem>
          <DropdownItem key="tip" asChild>
            <RegistryMenuLink to={`/`}>tip</RegistryMenuLink>
          </DropdownItem>
          <DropdownItem key="dao" asChild>
            <RegistryMenuLink to={`/`}>launch dao</RegistryMenuLink>
          </DropdownItem>
        </>
      </DropdownContent>
    </DropdownMenu>
  );
};
