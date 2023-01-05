const lib = require("../models/Lib");

const fetchall = (req, res) => {
  try {
    lib
      .find()
      .then((r) => {
        res.status(200).json({ lib: r, message: "fetched successfully" });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
      });
  } catch {
    console.log("e2");

    return res.status(500).json({ message: "internal server error" });
  }
};

const issueBook = (req, res) => {
  try {
    console.log(req.body);
    const datestr = new Date(req.body.date);
    console.log(datestr);
    const dueDatestr = new Date(req.body.duedate);
    console.log(dueDatestr);

    lib
      .create({
        student_id: req.body.student_id,
        bookName: req.body.bookName,
        date: datestr,
        dueDate: dueDatestr,
        status: req.body.status,
      })
      .then((r) => {
        console.log(r);
        res.status(200).json({ lib: r, message: "added successfully" });
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

const updateIssuedBook = (req, res) => {
  try {
    console.log(req.body);
    const datestr = new Date(req.body.date);
    console.log(datestr);
    const dueDatestr = new Date(req.body.duedate);
    console.log(dueDatestr);

    lib
      .updateOne(
        { _id: req.body._id },
        {
            student_id: req.body.student_id,
            bookName: req.body.bookName,
            date: datestr,
            dueDate: dueDatestr,
            status: req.body.status,
        }
      )
      .then((r) => {
        console.log(r);
        res
          .status(200)
          .json({ update: 1, lib: r, message: "updated successfully" });
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


const updateIssuedBookStatus = (req, res) => {
    try {
 
  
      lib
        .updateOne(
          { _id: req.body._id },
          {
            status: req.body.status,
          }
        )
        .then((r) => {
          console.log(r);
          res
            .status(200)
            .json({ update: 1, lib: r, message: "status updated successfully" });
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


const deleteIssueBook = (req, res) => {
  try {
    console.log(req.body);
    lib
      .deleteOne({ _id: req.body._id })
      .then((r) => {
        console.log(r);
        res
          .status(200)
          .json({ delete: 1, lib: r, message: "deleted successfully" });
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

module.exports = {
  issueBook,
  updateIssuedBook,
  fetchall,
  deleteIssueBook,
  updateIssuedBookStatus
};
