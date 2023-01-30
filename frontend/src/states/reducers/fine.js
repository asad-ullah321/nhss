const stock = [];

const FineReducer = (state = stock, action) => {
  console.log(state, "fine.js");
  if (action.type === "deleteissuedFine") {
    let temparray = [...state.filter((s) => s._id !== action.payload)];
    state = [...temparray];
    console.log(state, "From reducer");
    return state;
  } else if (action.type === "updateissuedFine") {
    let index = state.findIndex((s) => s._id === action.payload._id);
    let temparray = [...state];
    temparray[index] = action.payload;
    state = [...temparray];
    console.log(state);
    return state;
  }
  if (action.type === "updateFinestatus") {
    let index = state.findIndex((s) => s._id === action.payload._id);
    let temparray = [...state];
    temparray[index].status = action.payload.value;
    state = [...temparray];
    console.log(state);
    return state;
  } else if (action.type === "issueFine") {
    let already = state.findIndex((s) => s._id === action.payload._id);
    console.log(already, "fine adding new stock");
    if (already === -1) {
      let temparray = [...state];
      temparray.push(action.payload);
      state = [...temparray];
      return state;
    } 
    else 
      return state;
  } 
  else 
    return state;
};

export default FineReducer;
