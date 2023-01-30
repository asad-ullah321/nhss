const notification = {message:"", status:0, show:false}
  
  const notReducer = (state = notification, action) => {
    console.log(state, "notification");
    if(action.type === "updateNotification")
    state = action.payload;
    
    return state;
  };
  
  export default notReducer;
  