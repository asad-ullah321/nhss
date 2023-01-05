import { applyMiddleware, legacy_createStore as createstore } from "redux";

import thunk from "redux-thunk";
import reducers from "./reducers";
export const store = createstore (reducers, {}, applyMiddleware(thunk));