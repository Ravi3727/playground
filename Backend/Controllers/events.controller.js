import Event from "../Models/events.model.js"
import User from "../Models/user.model.js"
import asyncHandler from "../API/asyncHandler.js"
import ApiError from "../API/ApiError.js"
import ApiResponse from "../API/ApiResponse.js"

export const handleCreateEvent = asyncHandler(async (req, res) => {
  try {
    const { title, description, on_date, venue, department, type_of_event, createdBy } =
      req.body;
 
    // Create a new event instance
    const newEvent = new Event({
      title: title,
      description: description,
      on_date: on_date,
      venue: venue,
      department: department,
      type_of_event: type_of_event,
      createdBy: createdBy,
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

  } catch (error) {
    console.error("Error creating event:", error);
    throw new ApiError(500, error?.message || "Failed to create event");
  }
});

export const handleGetAllEvents = asyncHandler(async (req, res) => {
  try {
    const events = await Event.find();
    res
      .status(200)
      .json(new ApiResponse(200, events, "Events fetched successfully"));
  } catch (error) {
    res
      .status(500)
      .json(new ApiError(500, "Error while fetching the event", error));
  }
});

export const handleUpdateEvent = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = { $set: req.body };
    
    //while passing winners it must be an array of winners and as each time the whole winner
    //sections updates so pass new and previous winners collectively same for venue

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

export const handleDeleteEvent = asyncHandler(async (req, res) => {
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

export const handleUserRegistration = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user_id  = req.user._id;

    if (!user_id) {
      return res.status(400).json(new ApiError(400, "User ID is required"));
    }
  
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { $addToSet: { registered_user_id: user_id } },
      { new: true }
    );

    const updatedUser = await User.findByIdAndUpdate(
      user_id,
      { $addToSet: { events_Participated : id } },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json(new ApiError(404, "Event not found"));
    }

    if (!updatedUser) {
      return res.status(404).json(new ApiError(404, "User not found"));
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
 