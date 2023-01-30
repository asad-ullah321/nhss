const issueStock = require("../models/IssueStock");

const fetchall = (req, res) => {
  try {
    issueStock
      .find()
      .then((r) => {
        res.status(200).json({ stock: r, message: "Issued stock fetched successfully" });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
      });
  } catch {
    console.log("e2");

    return res.status(500).json({ message: "Internal server error" });
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
        res.status(200).json({ stock: r, message: "Issued Stock record added successfully" });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
      });
  } catch {
    () => {
      console.log("e2");

      return res.status(500).json({ message: "Internal server error" });
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
          .json({ update: 1, stock: r, message: "Issued Stock record updated successfully" });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
      });
  } catch {
    () => {
      console.log("e2");

      return res.status(500).json({ message: "Internal server error" });
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
            .json({ update: 1, stock: r, message: "Issued Stock record's status updated successfully" });
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
          .json({ delete: 1, stock: r, message: "Issued Stock record deleted successfully" });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
      });
  } catch {
    () => {
      console.log("e2");

      return res.status(500).json({ message: "Internal server error" });
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
