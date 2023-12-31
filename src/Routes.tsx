import { Routes as Router, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { LayoutContainer } from "./components/LayoutContainer";
import { EmitForm } from "./pages/EmitForm";
import { EmitDetail } from "./pages/EmitDetail";



export const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<LayoutContainer />}>
        <Route index element={<Home />} />
        <Route path={`/emit`} element={<EmitForm />} />
        <Route path={`/emit/:emitTag`} element={<EmitDetail />} />
      </Route>
    </Router>
  );
};
