const stock = require("../models/Stock");

const fetchall = (req, res) => {
  try {
    stock
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

const addStock = (req, res) => {
  try {
    console.log(req.body);
    const datestr = new Date(req.body.date);
    console.log(datestr);

    stock
      .create({
        stock: req.body.stock,
        quantity: req.body.quantity,
        location: req.body.location,
        date: datestr,
        description: req.body.comment,
        addedBy: req.body.username,
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


const updateStock =(req, res)=>{
    try {
        console.log(req.body);
        const datestr = new Date(req.body.date);
        console.log(datestr);
    
        stock
          .updateOne({_id: req.body._id},{
            stock: req.body.stock,
            quantity: req.body.quantity,
            location: req.body.location,
            date: datestr,
            description: req.body.comment,
            addedBy: req.body.username,
          })
          .then((r) => {
            console.log(r);
            res.status(200).json({ update: 1,stock: r, message: "updated successfully" });
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
}


const deleteStock = (req, res)=>{

    try {
        console.log(req.body);
        stock
          .deleteOne({_id: req.body._id})
          .then((r) => {
            console.log(r);
            res.status(200).json({ delete: 1,stock: r, message: "deleted successfully" });
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

}

module.exports = { addStock, fetchall, updateStock,deleteStock };
