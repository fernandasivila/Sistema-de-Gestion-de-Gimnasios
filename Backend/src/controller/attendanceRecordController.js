const AttendanceRecord = require("../database/models/AttendanceRecord");
const { validationResult } = require("express-validator");

const attendanceRecordController = {
    list: async (req, res) => {
        try {
            const attendanceRecords = await AttendanceRecord.find();
            res.status(200).json({
                meta: {
                    status: 200,
                    message: "Attendance Records retrieved successfully",
                },
                data: attendanceRecords
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                meta: {
                    status: 500,
                    message: "Internal Server Error",
                },
            });
        }
    },
    getById: async (req, res) => {
        const id = req.params.id;
        try {
            const attendanceRecord = await AttendanceRecord.findById(id);
            if (!attendanceRecord) {
                return res.status(404).json({
                    meta: {
                        status: 404,
                        message: "Attendance Record not found",
                    },
                });
            }
            res.status(200).json({
                meta: {
                    status: 200,
                    message: "Attendance Record found successfully",
                },
                data: attendanceRecord,
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
            let attendanceRecord = new Ad({
                ...req.body
            });
            try {
                await attendanceRecord.save();
                res.json({
                    meta: {
                        status: 200,
                        message: "Attendance Record created successfully",
                    },
                    data: attendanceRecord,
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
            await AttendanceRecord.deleteOne({ _id: id });
            res.json({
                meta: {
                    status: 200,
                    message: "Attendance Record deleted successfully",
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
            let updatedAttendanceRecord = new AttendanceRecord({
                ...req.body
            });
            try {
                await AttendanceRecord.updateOne({ _id: id }, updatedAttendanceRecord);
                res.json({
                    meta: {
                        status: 200,
                        message: "Attendance Record updated successfully",
                    },
                    data: updatedAttendanceRecord,
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

module.exports = attendanceRecordController;