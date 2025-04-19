// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  User, Settings, LogOut, PlusCircle, Edit, Trash2, 
  Calendar, BookOpen, Code, Server, Users, FileText, 
  ChevronRight, ExternalLink, Github, Linkedin
} from "lucide-react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("resources");
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [resources, setResources] = useState([]);
  const [editMode, setEditMode] = useState(null); // null, 'project', 'blog', 'resource'
  const [editItemId, setEditItemId] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    // Check if user is admin, if not redirect
    if (isLoaded && user?.publicMetadata?.role !== "admin") {
      navigate("/");
    }

    // Fetch mock data
    fetchMockData();
  }, [isLoaded, user, navigate]);

  const fetchMockData = () => {
    // Mock projects data
    setProjects([
      { id: 1, title: "Mastering Firebase", description: "Discover how Firebase works with modern web applications", date: "24 May, 2023" },
      { id: 2, title: "Mastering Firebase", description: "Discover how Firebase works with modern web applications", date: "24 May, 2023" },
      { id: 3, title: "Mastering Firebase", description: "Discover how Firebase works with modern web applications", date: "24 May, 2023" },
      { id: 4, title: "Mastering Firebase", description: "Discover how Firebase works with modern web applications", date: "24 May, 2023" },
      { id: 5, title: "Mastering Firebase", description: "Discover how Firebase works with modern web applications", date: "24 May, 2023" },
      { id: 6, title: "Mastering Firebase", description: "Discover how Firebase works with modern web applications", date: "24 May, 2023" },
    ]);

    // Mock blogs data
    setBlogs([
      { id: 1, title: "Marketing Tutorial", author: "John Doe", date: "05 May, 2023" },
      { id: 2, title: "Engineering Practices", author: "Jane Smith", date: "06 May, 2023" },
    ]);

    // Mock resources data
    setResources([
      { id: 1, title: "UI Tool Kit", type: "design", downloads: 120 },
      { id: 2, title: "UI Tool Kit", type: "design", downloads: 85 },
      { id: 3, title: "UI Tool Kit", type: "design", downloads: 210 },
      { id: 4, title: "UI Tool Kit", type: "design", downloads: 65 },
    ]);
  };

  const handleLogout = () => {
    signOut().then(() => {
      navigate('/');
    });
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  const handleEditItem = (type, id) => {
    setEditMode(type);
    setEditItemId(id);
    
    // Find the item to edit and set form data
    let item;
    switch(type) {
      case 'project':
        item = projects.find(p => p.id === id);
        setFormData({
          title: item.title,
          description: item.description,
          date: item.date
        });
        break;
      case 'blog':
        item = blogs.find(b => b.id === id);
        setFormData({
          title: item.title,
          author: item.author,
          date: item.date
        });
        break;
      case 'resource':
        item = resources.find(r => r.id === id);
        setFormData({
          title: item.title,
          type: item.type
        });
        break;
      default:
        break;
    }
  };

  const handleDeleteItem = (type, id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;
    
    switch(type) {
      case 'project':
        setProjects(prev => prev.filter(p => p.id !== id));
        break;
      case 'blog':
        setBlogs(prev => prev.filter(b => b.id !== id));
        break;
      case 'resource':
        setResources(prev => prev.filter(r => r.id !== id));
        break;
      default:
        break;
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    switch(editMode) {
      case 'project':
        setProjects(prev => 
          prev.map(p => p.id === editItemId ? { ...p, ...formData } : p)
        );
        break;
      case 'blog':
        setBlogs(prev => 
          prev.map(b => b.id === editItemId ? { ...b, ...formData } : b)
        );
        break;
      case 'resource':
        setResources(prev => 
          prev.map(r => r.id === editItemId ? { ...r, ...formData } : r)
        );
        break;
      default:
        break;
    }
    
    setEditMode(null);
    setEditItemId(null);
    setFormData({});
  };

  const handleAddNew = (type) => {
    setEditMode(`new_${type}`);
    setFormData({});
  };

  const handleCreateNew = (e) => {
    e.preventDefault();
    
    const newId = Date.now();
    switch(editMode) {
      case 'new_project':
        setProjects(prev => [
          ...prev, 
          { 
            id: newId, 
            title: formData.title || "New Project", 
            description: formData.description || "Project description", 
            date: formData.date || new Date().toLocaleDateString() 
          }
        ]);
        break;
      case 'new_blog':
        setBlogs(prev => [
          ...prev, 
          { 
            id: newId, 
            title: formData.title || "New Blog", 
            author: formData.author || "Anonymous", 
            date: formData.date || new Date().toLocaleDateString() 
          }
        ]);
        break;
      case 'new_resource':
        setResources(prev => [
          ...prev, 
          { 
            id: newId, 
            title: formData.title || "New Resource", 
            type: formData.type || "general" 
          }
        ]);
        break;
      default:
        break;
    }
    
    setEditMode(null);
    setFormData({});
  };

  const cancelEdit = () => {
    setEditMode(null);
    setEditItemId(null);
    setFormData({});
  };

  // Edit form for different content types
  const renderEditForm = () => {
    if (!editMode) return null;
    
    let formTitle = "";
    let isNewItem = editMode.startsWith('new_');
    
    if (editMode === 'project' || editMode === 'new_project') {
      formTitle = isNewItem ? "Add New Project" : "Edit Project";
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{formTitle}</h2>
            <form onSubmit={isNewItem ? handleCreateNew : handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Title</label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title || ''} 
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea 
                  name="description" 
                  value={formData.description || ''} 
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-lg"
                  rows="3"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Date</label>
                <input 
                  type="text" 
                  name="date" 
                  value={formData.date || ''} 
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={cancelEdit}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  {isNewItem ? "Create" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
    
    if (editMode === 'blog' || editMode === 'new_blog') {
      formTitle = isNewItem ? "Add New Blog" : "Edit Blog";
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{formTitle}</h2>
            <form onSubmit={isNewItem ? handleCreateNew : handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Title</label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title || ''} 
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Author</label>
                <input 
                  type="text" 
                  name="author" 
                  value={formData.author || ''} 
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Date</label>
                <input 
                  type="text" 
                  name="date" 
                  value={formData.date || ''} 
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={cancelEdit}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  {isNewItem ? "Create" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
    
    if (editMode === 'resource' || editMode === 'new_resource') {
      formTitle = isNewItem ? "Add New Resource" : "Edit Resource";
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{formTitle}</h2>
            <form onSubmit={isNewItem ? handleCreateNew : handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Title</label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title || ''} 
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Type</label>
                <select 
                  name="type" 
                  value={formData.type || 'design'} 
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-lg"
                  required
                >
                  <option value="design">Design</option>
                  <option value="code">Code</option>
                  <option value="tutorial">Tutorial</option>
                  <option value="documentation">Documentation</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={cancelEdit}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  {isNewItem ? "Create" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      
      <div className="container mx-auto px-4 py-2">
        <h1 className="text-2xl font-medium text-gray-700 mb-4">admin dashboard</h1>
      </div>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto bg-white mb-6 rounded-lg border shadow-sm">
        {/* Navigation Tabs */}
        <div className="flex items-center p-3 bg-gray-100 rounded-t-lg">
          <div className="flex items-center">
            <Link to="/" className="flex items-center mr-8">
              {/* GDG Logo */}
              <div className="flex items-center">
                <span className="h-5 w-5 bg-blue-500 rounded-l-full"></span>
                <span className="h-5 w-5 bg-red-500 rounded-t-full"></span>
                <span className="h-5 w-5 bg-yellow-400 rounded-b-full"></span>
                <span className="h-5 w-5 bg-green-500 rounded-r-full"></span>
              </div>
            </Link>
            <nav className="flex gap-6">
              <button 
                className={`px-3 py-1 text-sm ${activeTab === 'resources' ? 'bg-white rounded-md shadow-sm' : 'text-gray-600'}`}
                onClick={() => setActiveTab('resources')}
              >
                Resources & Blogs
              </button>
              <button 
                className={`px-3 py-1 text-sm ${activeTab === 'projects' ? 'bg-white rounded-md shadow-sm' : 'text-gray-600'}`}
                onClick={() => setActiveTab('projects')}
              >
                Projects
              </button>
              <button 
                className={`px-3 py-1 text-sm ${activeTab === 'events' ? 'bg-white rounded-md shadow-sm' : 'text-gray-600'}`}
                onClick={() => setActiveTab('events')}
              >
                Events
              </button>
              <button 
                className={`px-3 py-1 text-sm ${activeTab === 'forum' ? 'bg-white rounded-md shadow-sm' : 'text-gray-600'}`}
                onClick={() => setActiveTab('forum')}
              >
                Doubt Form
              </button>
            </nav>
          </div>
          <button className="ml-auto bg-black text-white text-xs px-3 py-1 rounded-full">
            Log in
          </button>
        </div>

        {/* User Profile Section */}
        <div className="flex flex-col md:flex-row p-6">
          <div className="flex-shrink-0 mr-6 mb-4 md:mb-0">
            <div className="relative">
              {user?.imageUrl ? (
                <img 
                  src={user.imageUrl} 
                  alt="Profile" 
                  className="h-36 w-36 rounded-md object-cover"
                />
              ) : (
                <img 
                  src="https://placekitten.com/200/200" 
                  alt="Profile" 
                  className="h-36 w-36 rounded-md object-cover"
                />
              )}
              <span className="absolute top-0 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded-md">
                Design
              </span>
            </div>
          </div>
          
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  Somya Shrivastav <span className="text-sm text-gray-500 font-normal">(GDG member)</span>
                </h2>
                <p className="text-gray-800 text-sm mt-1">
                  College branch <span className="text-gray-500 ml-1">College year</span>
                </p>
                <p className="text-gray-800 text-sm flex items-center gap-2 mt-1">
                  xyz@gmail.com
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600">
                    <Github className="h-4 w-4" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </p>
              </div>
            </div>

            {/* About Section */}
            <div className="mt-4 bg-green-500 p-4 rounded-md text-white">
              <h3 className="font-semibold mb-2">About Somya</h3>
              <p className="text-sm">
                Lorem ipsum is simply dummy text of the printing and typesetting 
                industry. Lorem Ipsum has been the industry's standard dummy text ever 
                since the 1500s, when an unknown printer took a galley of type and 
                scrambled it to make a type specimen book. It has survived not only five 
                centuries, but also the leap into electronic typesetting, remaining 
                essentially unchanged. It was popularised in the 1960s with the release 
                of Letraset sheets containing Lorem Ipsum passages, and more recently 
                with desktop publishing software like Aldus PageMaker including 
                versions of Lorem Ipsum.
              </p>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="p-6 mt-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">PROJECTS</h2>
            <button 
              onClick={() => handleAddNew('project')}
              className="text-blue-500 hover:underline text-sm flex items-center"
            >
              <PlusCircle className="h-4 w-4 mr-1" /> Add Project
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(project => (
              <div key={project.id} className="border rounded-lg overflow-hidden group">
                <div className="h-40 bg-indigo-50 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-10 w-10 rounded-full bg-blue-500"></div>
                    <div className="h-10 w-10 rounded-full bg-red-500"></div>
                    <div className="h-10 w-10 rounded-full bg-green-500"></div>
                    <div className="h-10 w-10 rounded-full bg-red-500"></div>
                    <div className="h-10 w-10 rounded-full bg-yellow-500"></div>
                    <div className="h-10 w-10 rounded-full bg-blue-500"></div>
                  </div>
                </div>
                <div className="p-4 relative">
                  <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleEditItem('project', project.id)}
                      className="p-1 text-gray-500 hover:text-blue-500"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteItem('project', project.id)}
                      className="p-1 text-gray-500 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <h3 className="font-medium">{project.title}</h3>
                  <p className="text-gray-500 text-sm">{project.description}</p>
                  <div className="text-xs text-gray-400 mt-2">{project.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Blogs Section */}
        <div className="p-6 border-t">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">BLOGS</h2>
            <button 
              onClick={() => handleAddNew('blog')}
              className="text-blue-500 hover:underline text-sm flex items-center"
            >
              <PlusCircle className="h-4 w-4 mr-1" /> Add Blog
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blogs.map(blog => (
              <div key={blog.id} className="border rounded-lg overflow-hidden group">
                <div className="h-40 bg-indigo-50 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-10 w-10 rounded-full bg-blue-500"></div>
                    <div className="h-10 w-10 rounded-full bg-red-500"></div>
                    <div className="h-10 w-10 rounded-full bg-green-500"></div>
                    <div className="h-10 w-10 rounded-full bg-red-500"></div>
                    <div className="h-10 w-10 rounded-full bg-yellow-500"></div>
                    <div className="h-10 w-10 rounded-full bg-blue-500"></div>
                  </div>
                </div>
                <div className="p-4 relative">
                  <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleEditItem('blog', blog.id)}
                      className="p-1 text-gray-500 hover:text-blue-500"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteItem('blog', blog.id)}
                      className="p-1 text-gray-500 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <h3 className="font-medium">{blog.title}</h3>
                  <p className="text-gray-500 text-sm">{blog.author}</p>
                  <div className="text-xs text-gray-400 mt-2">{blog.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Resources Section */}
        <div className="p-6 border-t mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">RESOURCES SHARED</h2>
            <button 
              onClick={() => handleAddNew('resource')}
              className="text-blue-500 hover:underline text-sm flex items-center"
            >
              <PlusCircle className="h-4 w-4 mr-1" /> Add Resource
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {resources.map(resource => (
              <div key={resource.id} className="border rounded-lg overflow-hidden group">
                <div className="h-32 bg-yellow-100 flex items-center justify-center p-4 relative">
                  <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleEditItem('resource', resource.id)}
                      className="p-1 text-gray-500 hover:text-blue-500"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteItem('resource', resource.id)}
                      className="p-1 text-gray-500 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center transform -rotate-12">
                    <div className="w-8 h-1 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="p-3 bg-green-100">
                  <h3 className="font-medium text-sm">{resource.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {/* Edit Form Modal */}
      {renderEditForm()}
    </div>
  );
};

export default AdminDashboard;
