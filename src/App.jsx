import React from "react";
import Navbar from "./components/Navbar";
import Pelis from "./components/Pelis";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Series from "./components/Series";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Pelis} />
          <Route path="/series" component={Series} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
