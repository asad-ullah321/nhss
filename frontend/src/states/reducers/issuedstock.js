const stock = [
  {
    _id: 1,
    stock: "Chairs",
    To: "Noor-Block Store",
    comment: "extra chairs",
    issuedby: "Qamer Shb",
    date: "2022-08-01",
    quantity: 12,
    status: "Issued",
  },
  {
    _id: 2,
    stock: "Chairs",
    To: "Noor-Block Store",
    comment: "extra chairs",
    issuedby: "Qamer Shb",
    date: "2022-08-02",
    quantity: 12,
    status: "Returned",
  },
];

const issuedstocksReducer = (state = stock, action) => {
  if (action.type === "deleteissuedStock") {
    let temparray = [...state.filter((s) => s._id !== action.payload)];
    state = [...temparray];
    return state;
  } else if (action.type === "updateissuedStock") {
    let index = state.findIndex((s) => s._id === action.payload._id);
    let temparray = [...state];
    temparray[index] = action.payload;
    state = [...temparray];
    console.log(state);
    return state;
  }
  if (action.type === "updatestatus") {
    let index = state.findIndex((s) => s._id === action.payload._id);
    let temparray = [...state];
    temparray[index].status = action.payload.value;
    state = [...temparray];
    console.log(state,"updatedstatus");
    return state;
  } else if (action.type === "issueStock") {

     let already = state.findIndex((s) => s._id === action.payload._id);
    //console.log(already, "stockreducer adding new stock");
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
  // console.log(state);
  return state;
};

export default issuedstocksReducer;
