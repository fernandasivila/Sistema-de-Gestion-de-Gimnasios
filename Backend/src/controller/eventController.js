const Event = require("../database/models/Event");
const { validationResult } = require("express-validator");

const eventController = {
    list: async (req, res) => {
        try {
            const events = await Event.find();
            res.status(200).json({
                meta: {
                    status: 200,
                    message: "Event retrieved successfully",
                },
                data: events
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
          const event = await Event.findById(id);
          if (!event) {
            return res.status(404).json({
              meta: {
                status: 404,
                message: "Event not found",
              },
            });
          }
          res.status(200).json({
            meta: {
              status: 200,
              message: "Event found successfully",
            },
            data: event,
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
          let event = new Event({
            ...req.body
          });
          try {
            await event.save();
            res.json({
              meta: {
                status: 200,
                message: "Class created successfully",
              },
              data: event,
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
          await Event.deleteOne({ _id: id });
          res.json({
            meta: {
              status: 200,
              message: "Event deleted successfully",
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
          let updatedEvent = new Event({
            ...req.body
          });
          try {
            await Event.updateOne({ _id: id }, updatedEvent);
            res.json({
              meta: {
                status: 200,
                message: "Event updated successfully",
              },
              data: updatedEvent,
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
    
    module.exports = eventController;