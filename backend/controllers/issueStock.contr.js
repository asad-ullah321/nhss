const issueStock = require("../models/IssueStock");

const fetchall = (req, res) => {
  try {
    issueStock
      .find()
      .then((r) => {
        res.status(200).json({ stock: r, message: "fetched successfully" });
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

const addIssueStock = (req, res) => {
  try {
    console.log(req.body);
    const datestr = new Date(req.body.date);
    console.log(datestr);

    issueStock
      .create({
        stock: req.body.stock,
        quantity: req.body.quantity,
        To: req.body.To,
        date: datestr,
        description: req.body.comment,
        issuedby: req.body.issuedby,
        status: req.body.status,
      })
      .then((r) => {
        console.log(r);
        res.status(200).json({ stock: r, message: "added successfully" });
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

const updateIssueStock = (req, res) => {
  try {
    console.log(req.body);
    const datestr = new Date(req.body.date);
    console.log(datestr);

    issueStock
      .updateOne(
        { _id: req.body._id },
        {
          stock: req.body.stock,
          quantity: req.body.quantity,
          location: req.body.location,
          date: datestr,
          description: req.body.comment,
          issuedby: req.body.To,
          status: req.body.status,
        }
      )
      .then((r) => {
        console.log(r);
        res
          .status(200)
          .json({ update: 1, stock: r, message: "updated successfully" });
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


const updateIssueStockStatus = (req, res) => {
    try {
 
  
      issueStock
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
            .json({ update: 1, stock: r, message: "status updated successfully" });
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


const deleteIssueStock = (req, res) => {
  try {
    console.log(req.body);
    issueStock
      .deleteOne({ _id: req.body._id })
      .then((r) => {
        console.log(r);
        res
          .status(200)
          .json({ delete: 1, stock: r, message: "deleted successfully" });
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
  addIssueStock,
  fetchall,
  updateIssueStock,
  deleteIssueStock,
  updateIssueStockStatus
};
