import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Series from "./components/Series";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Switch>
          <Route path="/contacto">contacto</Route>
          <Route exact path="/" component={Home} />
          <Route path="/series" component={Series} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
