import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { Search, Filter, BookOpen, Video, Code } from "lucide-react";

const apiUrl = import.meta.env.VITE_BACKENDURL;

const ResourcesPage = () => {
  const [activeTab, setActiveTab] = useState("resources");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilters, setCategoryFilters] = useState({
    androidDevelopment: false,
    webDevelopment: false,
    cloudComputing: false,
    machineLearning: false,
    flutter: false,
  });
  const [typeFilters, setTypeFilters] = useState({
    courses: false,
    tutorials: false,
    documentation: false,
    tools: false,
  });
  const [blogFilters, setBlogFilters] = useState({
    technology: false,
    tutorials: false,
    eventRecaps: false,
    experiences: false,
  });
  const [authorFilters, setAuthorFilters] = useState({
    students: false,
    faculty: false,
    industryExperts: false,
  });

  // Real data states
  const [resources, setResources] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch resources and blogs from backend
  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/resources/`);
        const res = await response.json();
        if (res.statusCode === 200) {
          const all = res.data || [];
          setResources(
            all.filter(
              (item) =>
                item.tag === "resource" || item.type === "resource" || !item.tag
            )
          );
          setBlogs(
            all.filter((item) => item.tag === "blog" || item.type === "blog")
          );
        } else {
          setResources([]);
          setBlogs([]);
        }
      } catch (error) {
        setResources([]);
        setBlogs([]);
      }
      setLoading(false);
    };
    fetchResources();
  }, []);

  // Filter logic (example: filter by search, category, type)
  const filteredResources = resources.filter((resource) => {
    let matches = true;
    // Search filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      matches =
        resource.title?.toLowerCase().includes(q) ||
        resource.description?.toLowerCase().includes(q) ||
        resource.category?.toLowerCase().includes(q);
    }
    // Category filters
    if (matches && Object.values(categoryFilters).some(Boolean)) {
      matches = false;
      if (categoryFilters.androidDevelopment && resource.category === "Android")
        matches = true;
      if (categoryFilters.webDevelopment && resource.category === "Web")
        matches = true;
      if (categoryFilters.cloudComputing && resource.category === "Cloud")
        matches = true;
      if (categoryFilters.machineLearning && resource.category === "ML")
        matches = true;
      if (categoryFilters.flutter && resource.category === "Flutter")
        matches = true;
    }
    // Type filters
    if (matches && Object.values(typeFilters).some(Boolean)) {
      matches = false;
      if (typeFilters.courses && resource.type === "course") matches = true;
      if (typeFilters.tutorials && resource.type === "tutorial") matches = true;
      if (typeFilters.documentation && resource.type === "documentation")
        matches = true;
      if (typeFilters.tools && resource.type === "tool") matches = true;
    }
    return matches;
  });

  const filteredBlogs = blogs.filter((blog) => {
    let matches = true;
    // Search filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      matches =
        blog.title?.toLowerCase().includes(q) ||
        blog.description?.toLowerCase().includes(q) ||
        blog.category?.toLowerCase().includes(q);
    }
    // Blog category filters
    if (matches && Object.values(blogFilters).some(Boolean)) {
      matches = false;
      if (blogFilters.technology && blog.category === "Technology")
        matches = true;
      if (blogFilters.tutorials && blog.category === "Tutorial") matches = true;
      if (blogFilters.eventRecaps && blog.category === "Event Recap")
        matches = true;
      if (blogFilters.experiences && blog.category === "Experiences")
        matches = true;
    }
    // Author filters (if author info available)
    if (matches && Object.values(authorFilters).some(Boolean) && blog.author) {
      matches = false;
      if (
        authorFilters.students &&
        blog.author.role?.toLowerCase().includes("student")
      )
        matches = true;
      if (
        authorFilters.faculty &&
        blog.author.role?.toLowerCase().includes("faculty")
      )
        matches = true;
      if (
        authorFilters.industryExperts &&
        blog.author.role?.toLowerCase().includes("industry")
      )
        matches = true;
    }
    return matches;
  });

  // Toggle filter checkboxes
  const toggleCategoryFilter = (filterName) => {
    setCategoryFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const toggleTypeFilter = (filterName) => {
    setTypeFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const toggleBlogFilter = (filterName) => {
    setBlogFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const toggleAuthorFilter = (filterName) => {
    setAuthorFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setCategoryFilters({
      androidDevelopment: false,
      webDevelopment: false,
      cloudComputing: false,
      machineLearning: false,
      flutter: false,
    });
    setTypeFilters({
      courses: false,
      tutorials: false,
      documentation: false,
      tools: false,
    });
    setBlogFilters({
      technology: false,
      tutorials: false,
      eventRecaps: false,
      experiences: false,
    });
    setAuthorFilters({
      students: false,
      faculty: false,
      industryExperts: false,
    });
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col">
      {" "}
      {/* Changed bg-white to bg-yellow-50 */}
      {/* Navbar with yellow background */}
      <div className="bg-yellow-50">
        {" "}
        {/* Wrap navbar in yellow background */}
        <NavBar />
      </div>
      {/* Hero Section */}
      <section className="bg-yellow-50 py-12">
        {" "}
        {/* Keep existing yellow background */}
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Resources & Blogs</h1>
            <p className="text-lg text-gray-600 mb-6">
              Access top resources, free & paid courses to speed up your
              learning, and publish your own blogs to share your knowledge.
            </p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <input
                type="search"
                placeholder="Search resources, blogs, tutorials..."
                className="pl-10 py-2 pr-4 rounded-full w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>
      {/* Tabs and Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Tabs */}
          <div className="flex mb-6 border-b">
            <button
              className={`py-2 px-6 text-center ${activeTab === "resources"
                ? "border-b-2 border-blue-500 font-medium"
                : "text-gray-500"
                }`}
              onClick={() => setActiveTab("resources")}
            >
              Resources
            </button>
            <button
              className={`py-2 px-6 text-center ${activeTab === "blogs"
                ? "border-b-2 border-blue-500 font-medium"
                : "text-gray-500"
                }`}
              onClick={() => setActiveTab("blogs")}
            >
              Blogs
            </button>
          </div>

          {/* Resources Tab Content */}
          {activeTab === "resources" && (
            <div className="flex flex-col md:flex-row gap-6">
              {/* Sidebar Filters */}
              <div className="w-full md:w-64 space-y-6">
                {/* Categories */}
                <div className="border rounded-lg p-4 bg-white shadow-sm">
                  <h3 className="font-medium text-gray-800 mb-3">Categories</h3>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={categoryFilters.androidDevelopment}
                        onChange={() =>
                          toggleCategoryFilter("androidDevelopment")
                        }
                        className="h-4 w-4 text-blue-600 rounded mr-2"
                      />
                      <span className="text-sm text-gray-700">
                        Android Development
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={categoryFilters.webDevelopment}
                        onChange={() => toggleCategoryFilter("webDevelopment")}
                        className="h-4 w-4 text-blue-600 rounded mr-2"
                      />
                      <span className="text-sm text-gray-700">
                        Web Development
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={categoryFilters.cloudComputing}
                        onChange={() => toggleCategoryFilter("cloudComputing")}
                        className="h-4 w-4 text-blue-600 rounded mr-2"
                      />
                      <span className="text-sm text-gray-700">
                        Cloud Computing
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={categoryFilters.machineLearning}
                        onChange={() => toggleCategoryFilter("machineLearning")}
                        className="h-4 w-4 text-blue-600 rounded mr-2"
                      />
                      <span className="text-sm text-gray-700">
                        Machine Learning
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={categoryFilters.flutter}
                        onChange={() => toggleCategoryFilter("flutter")}
                        className="h-4 w-4 text-blue-600 rounded mr-2"
                      />
                      <span className="text-sm text-gray-700">Flutter</span>
                    </label>
                  </div>
                </div>

                {/* Resource Type */}
                <div className="border rounded-lg p-4 bg-white shadow-sm">
                  <h3 className="font-medium text-gray-800 mb-3">
                    Resource Type
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={typeFilters.courses}
                        onChange={() => toggleTypeFilter("courses")}
                        className="h-4 w-4 text-blue-600 rounded mr-2"
                      />
                      <span className="text-sm text-gray-700">Courses</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={typeFilters.tutorials}
                        onChange={() => toggleTypeFilter("tutorials")}
                        className="h-4 w-4 text-blue-600 rounded mr-2"
                      />
                      <span className="text-sm text-gray-700">Tutorials</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={typeFilters.documentation}
                        onChange={() => toggleTypeFilter("documentation")}
                        className="h-4 w-4 text-blue-600 rounded mr-2"
                      />
                      <span className="text-sm text-gray-700">
                        Documentation
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={typeFilters.tools}
                        onChange={() => toggleTypeFilter("tools")}
                        className="h-4 w-4 text-blue-600 rounded mr-2"
                      />
                      <span className="text-sm text-gray-700">Tools</span>
                    </label>
                  </div>
                </div>

                {/* Apply Filters Button */}
                <button
                  onClick={resetFilters}
                  className="w-full border border-gray-300 rounded-lg py-2.5 flex items-center justify-center bg-white shadow-sm hover:bg-gray-50"
                >
                  <Filter className="mr-2 h-4 w-4" /> Apply Filters
                </button>
              </div>

              {/* Resources Grid */}
              <div className="flex-1">
                {
                  resources.length === 0 &&
                  <div className="mt-8 flex justify-center">
                    <h1 className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50">
                      No Resource Found
                    </h1>
                  </div>
                }
                <div className="grid md:grid-cols-2 gap-6 bg-red-400">
                  {(resources.length > 0) ? (resources.map((resource) => (
                    <div
                      key={resource.id}
                      className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="p-4 border-b bg-gray-50 flex items-center">
                        {resource.icon}
                        <span className="font-medium capitalize">
                          {resource.type}
                        </span>
                        <span className="ml-auto text-sm text-gray-500">
                          {resource.category}
                        </span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2">
                          {resource.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {resource.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-blue-600">
                            {resource.price}
                          </span>
                          <button className="px-4 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                            View Resource
                          </button>
                        </div>
                      </div>
                    </div>
                  ))) :""}
                </div>

                {
                  resources.length > 0 &&

                  <div className="mt-8 flex justify-center">
                    <button className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50">
                      Load More Resources
                    </button>
                  </div>
                }
              </div>
            </div>
          )}

          {/* Blogs Tab Content */}
          {activeTab === "blogs" && (
            <div className="flex flex-col md:flex-row gap-6">
              {/* Sidebar */}
              <div className="w-full md:w-64 space-y-6">
                {/* Categories */}
                <div className="border rounded-lg p-4 bg-white shadow-sm">
                  <h3 className="font-medium text-gray-800 mb-3">Categories</h3>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={blogFilters.technology}
                        onChange={() => toggleBlogFilter("technology")}
                        className="h-4 w-4 text-blue-600 rounded mr-2"
                      />
                      <span className="text-sm text-gray-700">Technology</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={blogFilters.tutorials}
                        onChange={() => toggleBlogFilter("tutorials")}
                        className="h-4 w-4 text-blue-600 rounded mr-2"
                      />
                      <span className="text-sm text-gray-700">Tutorials</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={blogFilters.eventRecaps}
                        onChange={() => toggleBlogFilter("eventRecaps")}
                        className="h-4 w-4 text-blue-600 rounded mr-2"
                      />
                      <span className="text-sm text-gray-700">
                        Event Recaps
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={blogFilters.experiences}
                        onChange={() => toggleBlogFilter("experiences")}
                        className="h-4 w-4 text-blue-600 rounded mr-2"
                      />
                      <span className="text-sm text-gray-700">Experiences</span>
                    </label>
                  </div>
                </div>

                {/* Authors */}
                <div className="border rounded-lg p-4 bg-white shadow-sm">
                  <h3 className="font-medium text-gray-800 mb-3">Authors</h3>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={authorFilters.students}
                        onChange={() => toggleAuthorFilter("students")}
                        className="h-4 w-4 text-blue-600 rounded mr-2"
                      />
                      <span className="text-sm text-gray-700">Students</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={authorFilters.faculty}
                        onChange={() => toggleAuthorFilter("faculty")}
                        className="h-4 w-4 text-blue-600 rounded mr-2"
                      />
                      <span className="text-sm text-gray-700">Faculty</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={authorFilters.industryExperts}
                        onChange={() => toggleAuthorFilter("industryExperts")}
                        className="h-4 w-4 text-blue-600 rounded mr-2"
                      />
                      <span className="text-sm text-gray-700">
                        Industry Experts
                      </span>
                    </label>
                  </div>
                </div>

                {/* Apply Filters Button */}
                <button
                  onClick={resetFilters}
                  className="w-full border border-gray-300 rounded-lg py-2.5 flex items-center justify-center bg-white shadow-sm hover:bg-gray-50"
                >
                  <Filter className="mr-2 h-4 w-4" /> Apply Filters
                </button>
              </div>

              {/* Blog Posts */}
              <div className="flex-1">
                <div className="space-y-6">
                  {(blogs.length > 0) ? (blogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="p-6 flex-1">
                          <div className="flex items-center mb-2">
                            <span
                              className={`text-xs bg-${blog.categoryColor}-100 text-${blog.categoryColor}-600 px-2 py-1 rounded`}
                            >
                              {blog.category}
                            </span>
                            <span className="text-xs text-gray-500 ml-auto">
                              {blog.date}
                            </span>
                          </div>
                          <h3 className="font-bold text-xl mb-2">
                            {blog.title}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {blog.description}
                          </p>
                          <div className="flex items-center">
                            <img
                              src={blog.author.image}
                              alt={blog.author.name}
                              className="w-10 h-10 rounded-full mr-3"
                            />
                            <div>
                              <div className="font-medium">
                                {blog.author.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {blog.author.role}
                              </div>
                            </div>
                            <button className="ml-auto px-4 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                              Read More
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))) :
                    (
                      <div className="mt-8 flex justify-center">
                        <h1 className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50">
                          No Blogs Found
                        </h1>
                      </div>
                    )
                  }
                </div>

                {
                  blogs.length > 0 &&
                  <div className="mt-8 flex justify-center">
                    <button className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50">
                      Load More Blogs
                    </button>
                  </div>
                }
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;
