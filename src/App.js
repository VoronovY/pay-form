import "./App.scss";
import { Switch, Route } from "react-router";

import PayForm from "./components/PayForm/Payform";
import PayCheck from "./components/PayForm/PayCheck";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <PayForm />
        </Route>
        <Route exact path="/pay/check">
          <PayCheck />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
/* Оплата банковской картой */
