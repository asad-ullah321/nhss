const stock = [
  {
    _id: 60,
    stock: "Tables",
    location: "Masroor-Block Store",
    comment: "for extra chairs",
    username: "Qamer Shb",
    date: "2022-08-02",
    quantity: 12,
  },
];

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
