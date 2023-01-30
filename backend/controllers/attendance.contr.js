const attendances = require("../models/Attendance");

const fetchAttendance = (req, res) => {
  try {
    attendances
      .find({ class: req.query.class, date: new Date(req.query.date) })
      .then((r) => {
        res.status(200).json({fetched: 1, att: r, message: "Attendance data fetched successfully" });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({fetched: 0, message: "Internal server error" });
      });
  } catch {
    console.log("e2");

    return res.status(500).json({fetched: 0, message: "Internal server error" });
  }
};

const addAttendance = (req, res) => {
  try {
    attendances
      .findOne({ class: req.query.class, date: new Date(req.query.date) })
      .then((exists) => {
        if (exists) {
          res.status(200).json({ att: 0, message: "Attendance allready exists" });
        } else {
          attendances
            .create(req.body)
            .then((r) => {
              console.log(r);
              res.status(200).json({ att: 1, message: "Attendance added successfully" });
            })
            .catch((error) => {
              console.log(error);
              return res.status(500).json({ att: 0, message: "Internal server error" });
            });
        }
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ att: 0, message: "Internal server error" });
      });
  } catch {
    () => {
      console.log("e2");

      return res.status(500).json({ att: 0, message: "Internal server error" });
    };
  }
};

const updateAttendance = (req, res) => {
  try {
    attendances
      .updateOne(
        { _id: req.body._id },
        {
          attendance: req.body.attendance,
        }
      )
      .then((r) => {
        console.log(r);
        res
          .status(200)
          .json({ update: 1, att: r, message: "Attendance updated successfully" });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ update: 0, message: "Internal server error" });
      });
  } catch {
    () => {
      console.log("e2");

      return res.status(500).json({ update: 0,message: "Internal server error" });
    };
  }
};

const deleteAttendance = (req, res) => {
  try {
    console.log(req.body);
    attendances
      .deleteMany({ class: req.query.class, date: new Date(req.query.date) })
      .then((r) => {
        console.log(r);
        res
          .status(200)
          .json({ delete: 1, att: r, message: "Attendance deleted successfully" });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({delete: 0, message: "Internal server error" });
      });
  } catch {
    () => {
      console.log("e2");

      return res.status(500).json({delete: 0, message: "Internal server error" });
    };
  }
};

module.exports = {
  fetchAttendance,
  addAttendance,
  updateAttendance,
  deleteAttendance,
};
