
/*<----------Action Creators for Stock---------->*/
export const deleteStock = (index) => {
    return (dispatch)=>{
        dispatch({type:"deleteStock", payload: index});
    }
}
export const updateStock = (object) => {
    return (dispatch)=>{
        dispatch({type:"updateStock", payload: object});
    }
}
export const addStock = (object) => {
    return (dispatch)=>{
        dispatch({type:"addStock", payload: object});
    }
}



/*<----------Action Creators for issueing Stock---------->*/
export const issueStock = (object) => {
    return (dispatch)=>{
        dispatch({type:"issueStock", payload: object});
    }
}

export const updatestatus = (object) => {
    return (dispatch)=>{
        dispatch({type:"updatestatus", payload: object});
    }
}

export const deleteissuedStock = (index) => {
    return (dispatch)=>{
        dispatch({type:"deleteissuedStock", payload: index});
    }
}
export const updateissuedStock = (object) => {
    return (dispatch)=>{
        dispatch({type:"updateissuedStock", payload: object});
    }
}




/*<----------Action Creators for Fine---------->*/
export const issueFine = (object) => {
    return (dispatch)=>{
        dispatch({type:"issueFine", payload: object});
    }
}

export const updateFinestatus = (object) => {
    return (dispatch)=>{
        dispatch({type:"updateFinestatus", payload: object});
    }
}

export const deleteissuedFine = (index) => {
    return (dispatch)=>{
        dispatch({type:"deleteissuedFine", payload: index});
    }
}
export const updateissuedFine = (object) => {
    return (dispatch)=>{
        dispatch({type:"updateissuedFine", payload: object});
    }
}




/*<----------Action Creators for Lib---------->*/
export const issueBook = (object) => {
    return (dispatch)=>{
        dispatch({type:"issueBook", payload: object});
    }
}

export const updateBookstatus = (object) => {
    return (dispatch)=>{
        dispatch({type:"updateBookstatus", payload: object});
    }
}

export const deleteissuedBook = (index) => {
    return (dispatch)=>{
        dispatch({type:"deleteissuedBook", payload: index});
    }
}
export const updateissuedBook = (object) => {
    return (dispatch)=>{
        dispatch({type:"updateissuedBook", payload: object});
    }
}


/*<----------Action Creators for Attendance---------->*/
export const addAttendance = (object) => {
    return (dispatch)=>{
        dispatch({type:"newattendance", payload: object});
    }
}




/*<----------Action Creators for Students---------->*/
export const addStudent = (object) => {
    return (dispatch)=>{
        dispatch({type:"addstudent", payload: object});
    }
}

/*export const updateBookstatus = (object) => {
    return (dispatch)=>{
        dispatch({type:"updateBookstatus", payload: object});
    }
}*/

export const deleteStudent = (index) => {
    return (dispatch)=>{
        dispatch({type:"deletestudent", payload: index});
    }
}
export const updateStudent = (object) => {
    return (dispatch)=>{
        dispatch({type:"updatestudent", payload: object});
    }
}

export const UpdateNotification=(object)=>{
    return (dispatch)=>{dispatch({type:"updateNotification",payload: object})}
}