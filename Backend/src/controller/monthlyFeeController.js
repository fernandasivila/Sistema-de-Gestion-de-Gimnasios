const { validationResult } = require("express-validator");
const MonthlyFee = require("../database/models/MonthlyFee");

const monthlyFeeController = {
  list: async (req, res) => {
    try {
      const monthlyFees = await MonthlyFee.find().populate('member');;
      res.status(200).json({
        meta: {
          status: 200,
          message: "Monthly Fees retrieved successfully",
        },
        data: monthlyFees,
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
      const monthlyFee = await MonthlyFee.findById(id).populate('member');;
      if (!monthlyFee) {
        return res.status(404).json({
          meta: {
            status: 404,
            message: "Monthly Fee not found",
          },
        });
      }
      res.status(200).json({
        meta: {
          status: 200,
          message: "Monthly Fee found successfully",
        },
        data: monthlyFee,
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
      let monthlyFee = new MonthlyFee(req.body);

      try {
        await monthlyFee.save();
        res.json({
          meta: {
            status: 200,
            message: "Monthly Fee created successfully",
          },
          data: monthlyFee,
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
      await MonthlyFee.deleteOne({ _id: id });
      res.json({
        meta: {
          status: 200,
          message: "Monthly Fee deleted successfully",
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
          const updatedMonthlyFee = await MonthlyFee.findByIdAndUpdate(id, req.body, { new: true }).populate('member');
          if (!updatedMonthlyFee) {
            return res.status(404).json({
              meta: {
                status: 404,
                message: "Monthly Fee not found",
              },
            });
          }
          res.json({
            meta: {
              status: 200,
              message: "Monthly Fee updated successfully",
            },
            data: updatedMonthlyFee,
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

module.exports = monthlyFeeController;
