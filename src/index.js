import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { Container } from "react-bootstrap";

import "./index.scss";

import * as serviceWorker from "./serviceWorker";
import browserReducer from "./store/reducers/browser";
import authReducer from "./store/reducers/auth";
import logReducer from "./store/reducers/log";
import Spinner from "./components/UI/Spinner/Spinner";

const rootReducer = combineReducers({
  browser: browserReducer,
  auth: authReducer,
  log: logReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const App = React.lazy(() => import("./App"));

ReactDOM.render(
  <Container fluid className="AppContainer">
    <Suspense fallback={<Spinner />}>
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  </Container>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
