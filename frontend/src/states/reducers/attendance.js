const stock= [{}];
  
  const attendance = (state = stock, action) => {
    if (action.type === "newattendance") {
      let temparray = [...state, ...action.payload];
      state = [...temparray];
      console.log(state, "attendance.js")
      return state;
    } else console.log(state, "attendance.js");
    return state;
  };
  
  export default attendance;
  