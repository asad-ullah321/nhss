const Books = [
 
    {
      _id: 22,
      student_id:"915M",
      bookName:"Pak Studies",
      status:"Issued",
      _date:"2022-08-01",
      duedate:"2022-08-01",
    }
   
  ];
  
  const LibReducer = (state = Books, action) => {
    if (action.type === "deleteissuedBook") {
      let temparray = [...state.filter((s) => s._id !== action.payload)];
      state = [...temparray];
      console.log(state,"From reducer")
      return state;
    } else if (action.type === "updateissuedBook") {
      let index = state.findIndex((s) => s._id === action.payload._id);
      let temparray = [...state];
      temparray[index] = action.payload;
      state = [...temparray];
      console.log(state);
      return state;
    }
    if (action.type === "updateBookstatus") {
      let index = state.findIndex((s) => s._id === action.payload.id);
      let temparray = [...state];
      temparray[index].status = action.payload.value;
      state = [...temparray];
      console.log(state);
      return state;
    } else if (action.type === "issueBook") {
      let temparray = [...state];
      temparray.push(action.payload);
      state = [...temparray];
      return state;
    } else 
    console.log(state, "fine.js");
    return state;
  };
  
  export default LibReducer;
  