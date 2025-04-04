const Event = require("../Models/events");
const asyncHandler = require("../API/asyncHandler");
const ApiError = require("../API/ApiError");
const ApiResponse = require("../API/ApiResponse");

const handleCreateEvent = asyncHandler(async (req, res) => {
  try {
    const {user_id} = req.bodyuser;
    const { title, description, on_date, venue, department, type_of_event } =
      req.body;

    // Create a new event instance
    const newEvent = new Event({
      title: title,
      description: description,
      on_date: on_date,
      venue: venue,
      department: department,
      type_of_event: type_of_event,
      createdBy: user_id,
    });

    // Save event to the database
    const savedEvent = await newEvent.save();

    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { event: savedEvent },
          "Event created successfully"
        )
      );

    //   { message: "Event created successfully", event: savedEvent }
  } catch (error) {
    console.error("Error creating event:", error);
    throw new ApiError(500, error?.message || "Failed to create event");
  }
});

const handleGetAllEvents = asyncHandler(async (req, res) => {
  try {
    const events = await Event.find();
    res
      .status(200)
      .json(new ApiResponse(200, events, "Events fetched successfully"));
  } catch (error) {
    next(new ApiError(500, "error while fetching events", error));
  }
});

const handleUpdateEvent = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = { $set: req.body };

    // Handle winners update separately
    if (req.body.winners) {
      updateData.$push = { winners: { $each: req.body.winners } }; // Push new winners to the array
    }

    // Ensure venue updates properly
    if (req.body.venue) {
      updateData.$set["venue.mode"] = req.body.venue.mode;
      updateData.$set["venue.place"] = req.body.venue.place;
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true, // Ensure schema validation
    });

    if (!updatedEvent) {
      return res.status(404).json(new ApiError(404, "Event not found"));
    }

    res
      .status(200)
      .json(new ApiResponse(200, updatedEvent, "Event updated successfully"));
  } catch (error) {
    res
      .status(500)
      .json(new ApiError(500, "Error while updating the event", error));
  }
});

const handleDeleteEvent = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json(new ApiError(404, "Event not found"));
    }
    res
      .status(200)
      .json(new ApiResponse(200, null, "Event deleted successfully"));
  } catch (error) {
    res
      .status(500)
      .json(new ApiError(500, "error while deleting the event", error));
  }
});

const handleUserRegistration = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json(new ApiError(400, "User ID is required"));
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { $addToSet: { registered_user_id: user_id } },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json(new ApiError(404, "Event not found"));
    }

    res
      .status(200)
      .json(new ApiResponse(200, updatedEvent, "User registered successfully"));
  } catch (error) {
    res
      .status(500)
      .json(new ApiError(500, "error while registering user to event", error));
  }
});

module.exports = {
  handleCreateEvent,
  handleGetAllEvents,
  handleDeleteEvent,
  handleUpdateEvent,
  handleUserRegistration,
};
