const student = require("../models/Students");

const fetchClass = (req, res) => {
  try {
    if (req.body.class != "") {
      student
        .find({ class: req.query.class })
        .then((r) => {
          res
            .status(200)
            .json({ students: r, message: "fetched successfully" });
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ message: "internal server error" });
        });
    }
  } catch {
    console.log("e2");

    return res.status(500).json({ message: "internal server error" });
  }
};

const addStudent = (req, res) => {
  try {
    if (
      req.body.class != "" &&
      req.body.sname != "" &&
      req.body.student_id != ""
    ) {
      student
        .create({
          student_id: req.body.student_id,
          sname: req.body.sname,
          class: req.body.class,
        })
        .then((r) => {
          res
            .status(200)
            .json({ students: r, message: "student added successfully" });
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ message: "internal server error" });
        });
    }
  } catch(e) {
    console.log("e2", e);

    return res.status(500).json({ message: "internal server error" });
  }
  
};




const updateStudent = (req, res) => {
    try {
      console.log(req.body);
      student
        .updateOne(
          { _id: req.body._id },
          {
            student_id: req.body.student_id,
            sname: req.body.sname,
            class: req.body.class,
          }
        )
        .then((r) => {
          console.log(r);
          res
            .status(200)
            .json({ update: 1, students: r, message: "updated successfully" });
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ message: "internal server error" });
        });
    } catch {
      (e) => {
        console.log("e2", e);
  
        return res.status(500).json({ message: "internal server error" });
      };
    }
  };

  const deleteStudent = (req, res) => {
    try {
      console.log(req.body);
      student
        .deleteOne({ _id: req.body._id })
        .then((r) => {
          console.log(r);
          res
            .status(200)
            .json({ delete: 1, students: r, message: "deleted successfully" });
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ message: "internal server error" });
        });
    } catch {
      () => {
        console.log("e2");
  
        return res.status(500).json({ message: "internal server error" });
      };
    }
  };
  


module.exports = { fetchClass,addStudent, updateStudent, deleteStudent };
