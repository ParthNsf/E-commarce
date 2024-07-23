const { salespeople } = require("../model");

const listsalseperson = async (req, res) => {
  try {
    const Salespeople = await salespeople.getsalsepersons();

    res.status(200).json({
      success: true,
      message: "Salespeople data fetched successfully",
      data: Salespeople,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching salespeople data: ",
      error: error.message,
    });
  }
};

const addsalseperson = async (req, res) => {
  const { SNAME, CITY, COMM } = req.body;

  const response = await salespeople.addsalsepersons(SNAME, CITY, COMM);

  res.status(201).json({
    success: true,
    message: "Salespeople data fetched successfully",
    data: response,
  });
};

const updatesalseperson = async (req, res) => {
  const { SNUM } = req.params;
  const { SNAME, CITY, COMM } = req.body;

  try {
    const response = await salespeople.updatesalsepersons(
     SNUM,
      SNAME,
      CITY,
      COMM
    );

    res.status(200).json({
      success: true,
      message: "Salesperson updated successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occurred while updating salesperson",
      error: error.message,
    });
  }
};

const deletesalseperson = async (req, res) => {
  try {
    const { SNUM } = req.params;
    const response = await salespeople.deletesalseperson(SNUM);

    res.status(200).json({
      success: true,
      message: "datadeleted",
      data: response,
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occurred while deleting salesperson",
      error: error.message,
    });
  }
};

module.exports = {
  listsalseperson,
  addsalseperson,
  updatesalseperson,
  deletesalseperson,
};
