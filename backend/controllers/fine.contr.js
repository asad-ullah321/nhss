const fine = require("../models/Fine");

const fetchall = (req, res) => {
  try {
    fine
      .find()
      .then((r) => {
        res.status(200).json({ fine: r, message: "fetched successfully" });
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

const addFine = (req, res) => {
  try {
    console.log(req.body);
    const datestr = new Date(req.body.date);
    console.log(datestr);
    const dueDatestr = new Date(req.body.duedate);
    console.log(dueDatestr);

    fine
      .create({
        student_id: req.body.student_id,
        amount: req.body.amount,
        reason: req.body.reason,
        date: datestr,
        dueDate: dueDatestr,
        status: req.body.status,
      })
      .then((r) => {
        console.log(r);
        res.status(200).json({ fine: r, message: "added successfully" });
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

const updateFine = (req, res) => {
  try {
    console.log(req.body);
    const datestr = new Date(req.body.date);
    console.log(datestr);
    const dueDatestr = new Date(req.body.duedate);
    console.log(dueDatestr);

    fine
      .updateOne(
        { _id: req.body._id },
        {
            student_id: req.body.student_id,
            amount: req.body.amount,
            reason: req.body.reason,
            date: datestr,
            dueDate: dueDatestr,
            status: req.body.status,
        }
      )
      .then((r) => {
        console.log(r);
        res
          .status(200)
          .json({ update: 1, fine: r, message: "updated successfully" });
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


const updateFineStatus = (req, res) => {
    try {
 
  
      fine
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
            .json({ update: 1, fine: r, message: "status updated successfully" });
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


const deleteFine = (req, res) => {
  try {
    console.log(req.body);
    fine
      .deleteOne({ _id: req.body._id })
      .then((r) => {
        console.log(r);
        res
          .status(200)
          .json({ delete: 1, fine: r, message: "deleted successfully" });
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
  addFine,
  updateFine,
  fetchall,
  deleteFine,
  updateFineStatus
};
