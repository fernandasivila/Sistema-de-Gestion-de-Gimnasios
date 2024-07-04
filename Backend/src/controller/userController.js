const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const User = require("../database/models/User");

const userController = {
  list: async (req, res) => {
    try {
      const users = await User.find().populate('role');;
      res.status(200).json({
        meta: {
          status: 200,
          message: "Users retrieved successfully",
        },
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        meta: {
          status: 500,
          message: "Internal Server Error",
        },
        data: {
          error: error.message,
        },
      });
    }
  },
  getById: async (req, res) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id).populate('role');
      if (!user) {
        return res.status(404).json({
          meta: {
            status: 404,
            message: "User not found",
          },
        });
      }
      res.status(200).json({
        meta: {
          status: 200,
          message: "User found successfully",
        },
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        meta: {
          status: 500,
          message: "Internal Server Error",
        },
        data: {
          error: error.message,
        },
      });
    }
  },
  add: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        meta: {
          status: 400,
          message: "Validation errors",
        },
        data: errors.array(),
      });
    } else {
      let user = new User({
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 10),
        img: {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        },
      });

      try {
        await user.save();
        res.json({
          meta: {
            status: 200,
            message: "User created successfully",
          },
          data: user,
        });
      } catch (error) {
        res.status(500).json({
          meta: {
            status: 500,
            message: "Error processing operation",
          },
          data: {
            error: error.message,
          },
        });
      }
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;
    try {
      await User.deleteOne({ _id: id });
      res.json({
        meta: {
          status: 200,
          message: "User deleted successfully",
        },
      });
    } catch (error) {
      res.status(500).json({
        meta: {
          status: 500,
          message: "Error processing operation",
        },
        data: {
          error: error.message,
        },
      });
    }
  },
  update: async (req, res) => {
    const id = req.params.id;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        meta: {
          status: 400,
          message: "Validation errors",
        },
        data: errors.array(),
      });
    } else {
      try {
        const user = {
          ...req.body,
          password: bcrypt.hashSync(req.body.password, 10),
          img: {
            data: req.file.buffer,
            contentType: req.file.mimetype
          },
        };
        const updatedUser = await User.findByIdAndUpdate(id, user, { new: true }).populate('role');
        if (!updatedUser) {
          return res.status(404).json({
            meta: {
              status: 404,
              message: "User not found",
            },
          });
        }
        res.json({
          meta: {
            status: 200,
            message: "User updated successfully",
          },
          data: updatedUser,
        });
      } catch (error) {
        res.status(500).json({
          meta: {
            status: 500,
            message: "Error processing operation",
          },
          data: {
            error: error.message,
          },
        });
      }
    }
  },
};

module.exports = userController;
