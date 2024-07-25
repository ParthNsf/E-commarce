const Users = require("../model/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const getuser = async (req,res) => {

//     try {
//         const aggregatedData = await user.aggregate([
//           // Your aggregation pipeline stages go here
//           // Example:
//           { $group: { _id: '$user', totalProducts: { $sum: 1 } } }
//         ]);

//         res.json(aggregatedData);
//       } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal server error' });
//       }

//     // try {
//     //     console.log(req.params.user_id);
//     //     const user = await user.findById(req.params.user_id);
//     //     console.log(user);

//     //     if (!user) {
//     //         res.status(404).json({
//     //             success: false,
//     //             message: 'user data not found.'
//     //         })
//     //     }

//     //     res.status(200).json({
//     //         success: false,
//     //         message: 'user data fetched.',
//     //         data: user
//     //     })
//     // } catch (error) {
//     //     res.status(500).json({
//     //         success: false,
//     //         message: 'Internal server error'+ error.message
//     //     })
//     // }
// }

const varifyaccesRefTokan = async (id) => {
  try {
    const user = await Users.findById(id);

    console.log(user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "invalid request",
      });
    }

    const accsesstoken = jwt.sign(
      { id: user._id, role: user.role, expiresIn: '1 Hours' },
      "exprngkjrgkrkgire",
      { expiresIn: 600 * 600 }
    );

    const refreshToken = jwt.sign({ id: id }, "jdbfksevfhefhkebjk", {
      expiresIn: "2 days",
    });

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accsesstoken, refreshToken };
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error" + error.message,
    });
  }
};

const registerUsers = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ $or: [{ email }] });

    if (user) {
      res.status(405).json({
        success: false,
        message: "email is alrady exist",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);

    if (!hashPassword) {
      res.status(400).json({
        success: false,
        message: "Internal error in password incryption",
      });
    }
    const users = await Users.create({ ...req.body, password: hashPassword });

    if (!users) {
      res.status(400).json({
        success: false,
        message: "Internal error in registration",
      });
    }

    const userData = await Users.findById(users._id).select("-password");

    res.status(201).json({
      success: true,
      message: "User register successfully",
      data: userData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error" + error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({
      $or: [{ email }],
    });

    console.log();

    if (!user) {
      res.status(404).json({
        success: false,
        message: "user is not exist",
      });
    }

    const validaccestokan = await bcrypt.compare(password, user.password);

    if (!validaccestokan) {
      res.status(401).json({
        success: false,
        message: "invalid password",
      });
    }

    const { accsesstoken, refreshToken } = await varifyaccesRefTokan(user._id);

    console.log(accsesstoken, refreshToken);

    const userDataF = await Users.findById({ _id: user._id }).select(
      "-password -refreshToken"
    );

    const option = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .cookie("accsesstoken", accsesstoken, option)
      .cookie("refreshToken", refreshToken, option)
      .json({
        success: true,
        message: "login success",
        data: {
          ...userDataF.toObject(),
          accsesstoken,
        },
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error" + error.message,
    });
  }
};

const generateNewTokens = async (req, res) => {
  try {
    console.log("req.body :::", req.cookies.refreshToken);

    const checkToken = await jwt.verify(req.cookies.refreshToken, "jdbfksevfhefhkebjk");
  
    console.log(checkToken);
  
    if (!checkToken) {
      return res.status(400).json({
        success: false,
        message: "Token expired",
      });
    }
  
    const user = await Users.findById(checkToken.id);
    console.log("user::::: ", user);
  
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Token",
      });
    }

    if (req.cookies.refreshToken != user.toObject().refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Invalid Token for this user",
      });
    }
    const data = await varifyaccesRefTokan(user._id);

    const option = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .cookie("accsesstoken", data.accsesstoken, option)
      .cookie("refreshToken", data.refreshToken, option)
      .json({
        success: true,
        message: "login success",
        data: data.accsesstoken
      });

 
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

// const updateuser = async (req,res) => {
//     try {
//         console.log(req.params.user_id);
//         const user = await user.findByIdAndUpdate(req.params.user_id,req.body,{new: true, runValidators: true})

//         if (!user) {
//             res.status(400).json({
//                 success: false,
//                 message: 'user data not found.'
//             })
//         }

//         res.status(200).json({
//             success: false,
//             message: 'user Updated Successfully.',
//             data: user
//         })
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Internal server error'+ error.message
//         })
//     }
// }

// const deleteuser = async (req,res) => {
//     try {
//         console.log(req.params.user_id);
//         const user = await user.findById(req.params.user_id);

//         if (!user) {
//             res.status(404).json({
//                 success: false,
//                 message: 'user data not found.'
//             })
//         }

//         const data = await user.findByIdAndDelete(req.params.user_id)

//         res.status(200).json({
//             success: false,
//             message: 'user Deleted Successfully.',
//             data: data
//         })
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Internal server error'+ error.message
//         })
//     }
// }

module.exports = {
  // listuser,
  registerUsers,
  login,
  generateNewTokens,
  // updateuser,
  // deleteuser,
  // getuser,
  // countsubuser
};
