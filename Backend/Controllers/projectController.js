import Project from "../Models/projectModel.js";
import User from "../Models/userModel.js";

export const createProject = async (req, res) => {
  try {
    const { title, description, category, githubLink, mvpLink } = req.body;

    if (!title || !description || !category || !githubLink) {
      return res.status(400).json({ error: "Title, description, category, and GitHub link are required" });
    }

    const userId = req.user.clerk_id;

    const project = await Project.create({
      title,
      description,
      category,
      githubLink,
      mvpLink,
      createdBy: userId,
    });

    await User.findOneAndUpdate(
      { clerk_id: userId },
      { $push: { projects: project._id } }
    );

    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    console.error("Create Project Error:", error);
    res.status(500).json({ error: "Server error while creating project" });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

export const getProjectsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const projects = await Project.find({ category });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category-wise projects' });
  }
};

export const getUserProjects = async (req, res) => {
  try {
    const userId = req.user.clerkId;
    const projects = await Project.find({ createdBy: userId });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user projects' });
  }
};

export const updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.user.clerkId;

    const updatedProject = await Project.findOneAndUpdate(
      { _id: projectId, createdBy: userId },
      req.body,
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: 'Project not found or unauthorized' });
    }

    res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.user.clerkId;

    const project = await Project.findOneAndDelete({
      _id: projectId,
      createdBy: userId,
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found or unauthorized' });
    }

    await User.findOneAndUpdate(
      { clerk_id: userId },
      { $pull: { projects: project._id } }
    );

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
};
