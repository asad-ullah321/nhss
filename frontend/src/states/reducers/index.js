import { combineReducers } from "redux";
import stocksReducer from "./stocks";
import issuedstocksReducer from "./issuedstock";
import FineReducer from "./fine";
import LibReducer from "./lib";
import student from "./student";
import attendance from "./attendance";

const reducers = combineReducers({
    stocks: stocksReducer,
    issuedstocks: issuedstocksReducer,
    fines: FineReducer,
    books: LibReducer,
    students:student,
    Attendance: attendance
})


export default reducers;