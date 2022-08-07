import React from "react";
import Layout from "./Components/Layout";
import { Switch, Route, Redirect } from "react-router-dom";
import Medicine from "./Containers/Medicine";
import Patients from "./Containers/Patients";
import Doctors from "./Containers/Doctors";
import { Provider } from "react-redux";
import { configureStore } from "./redux/store";

const App = () => {
  const store = configureStore();
  return (
    <>
      <Provider store={store}>
        <Layout>
          <Switch>
            <Route exact path="/medicine" component={Medicine} />
            <Route exact path="/patient" component={Patients} />
            <Route exact path="/doctor" component={Doctors} />
            <Redirect to="/medicine" />
          </Switch>
        </Layout>
      </Provider>
    </>
  );
};

export default App;
