const stock = [
  {
    _id: "11",
    student_id: "914M",
    sname: "Asad Ullah",
    class: "8",
  },
  {
    _id: "12",
    student_id: "915M",
    sname: "Naveed Ahmad",
    class: "8",
  },
  {
    _id: "13",
    student_id: "916M",
    sname: "Abdul Manan",
    class: "10",
  },
];

const student = (state = stock, action) => {
  if (action.type === "deletestudent") {
    let temparray = [...state.filter((s) => s._id !== action.payload)];
    state = [...temparray];
    console.log(state, "From reducer");
    return state;
  } else if (action.type === "updatestudent") {
    let index = state.findIndex((s) => s._id === action.payload._id);
    let temparray = [...state];
    temparray[index] = action.payload;
    state = [...temparray];
    console.log(state);
    return state;
  }
  if (action.type === "updatestudent") {
    let index = state.findIndex((s) => s._id === action.payload.id);
    let temparray = [...state];
    temparray[index].status = action.payload.value;
    state = [...temparray];
    console.log(state);
    return state;
  } else if (action.type === "addstudent") {
    let temparray = [...state];
    temparray.push(action.payload);
    state = [...temparray];
    return state;
  } else console.log(state, "student.js");
  return state;
};

export default student;
