import { DHLayout, useDHConnect } from "@daohaus/connect";
import { TXBuilder } from "@daohaus/tx-builder";
import { H4 } from "@daohaus/ui";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { TARGET } from "../targetDao";
import { CurrentDaoProvider, useDaoData } from "@daohaus/moloch-v3-hooks";

export const LayoutContainer = () => {
  const location = useLocation();

  const { publicClient, address } = useDHConnect();

  return (
    <DHLayout
      pathname={location.pathname}
      navLinks={[
        { label: "Emits", href: `/` },
        { label: "BookMarks", href: `/bookmark` },
      ]}
      leftNav={<H4>E</H4>}
    >
      <TXBuilder
        publicClient={publicClient}
        chainId={TARGET.CHAIN_ID}
        appState={{ userAddress: address }}
      >
        <Outlet />
      </TXBuilder>
    </DHLayout>
  );
};
