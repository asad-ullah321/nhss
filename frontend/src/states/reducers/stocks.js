const stock = [];

const stocksReducer = (state = stock, action) => {
  if (action.type === "deleteStock") {
    let temparray = [...state.filter((s) => s._id !== action.payload)];
    state = [...temparray];
    return state;
  } else if (action.type === "updateStock") {
    let index = state.findIndex((s) => s._id === action.payload._id);
    let temparray = [...state];
    temparray[index] = action.payload;
    state = [...temparray];
    console.log(state);
    return state;
  } else if (action.type === "addStock") {
    let already = state.findIndex((s) => s._id === action.payload._id);
    console.log(already, "stockreducer adding new stock");
    if (already===-1) {
      let temparray = [...state];
      temparray.push(action.payload);
      state = [...temparray];
      return state;
    } 
    else 
      return state;
  }
  //console.log(state);
  else return state;
};

export default stocksReducer;
