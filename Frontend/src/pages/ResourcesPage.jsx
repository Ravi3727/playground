import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { Search, Filter, BookOpen, Video, Code } from "lucide-react";

const ResourcesPage = () => {
  const [activeTab, setActiveTab] = useState("resources");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilters, setCategoryFilters] = useState({
    androidDevelopment: false,
    webDevelopment: false,
    cloudComputing: false,
    machineLearning: false,
    flutter: false
  });
  const [typeFilters, setTypeFilters] = useState({
    courses: false,
    tutorials: false,
    documentation: false,
    tools: false
  });
  const [blogFilters, setBlogFilters] = useState({
    technology: false,
    tutorials: false,
    eventRecaps: false,
    experiences: false
  });
  const [authorFilters, setAuthorFilters] = useState({
    students: false,
    faculty: false,
    industryExperts: false
  });

  // Toggle filter checkboxes
  const toggleCategoryFilter = (filterName) => {
    setCategoryFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const toggleTypeFilter = (filterName) => {
    setTypeFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const toggleBlogFilter = (filterName) => {
    setBlogFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const toggleAuthorFilter = (filterName) => {
    setAuthorFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setCategoryFilters({
      androidDevelopment: false,
      webDevelopment: false,
      cloudComputing: false,
      machineLearning: false,
      flutter: false
    });
    setTypeFilters({
      courses: false,
      tutorials: false,
      documentation: false,
      tools: false
    });
    setBlogFilters({
      technology: false,
      tutorials: false,
      eventRecaps: false,
      experiences: false
    });
    setAuthorFilters({
      students: false,
      faculty: false,
      industryExperts: false
    });
    setSearchQuery("");
  };

  // Mock resource data
  const resources = [
    {
      id: 1,
      type: "course",
      icon: <BookOpen className="h-5 w-5 mr-2 text-blue-600" />,
      category: "Android",
      title: "Android Development for Beginners",
      description: "Learn the basics of Android app development with Kotlin. This comprehensive course covers everything from setup to publishing.",
      price: "Free"
    },
    {
      id: 2,
      type: "tutorial",
      icon: <Video className="h-5 w-5 mr-2 text-red-600" />,
      category: "Web",
      title: "Building with Next.js and Firebase",
      description: "A step-by-step tutorial on how to build a full-stack application using Next.js and Firebase. Includes authentication and database.",
      price: "Free"
    },
    {
      id: 3,
      type: "tool",
      icon: <Code className="h-5 w-5 mr-2 text-green-600" />,
      category: "Cloud",
      title: "Google Cloud Platform Essentials",
      description: "A collection of tools and resources to help you get started with Google Cloud Platform. Includes $300 free credit.",
      price: "Free Trial"
    },
    {
      id: 4,
      type: "course",
      icon: <BookOpen className="h-5 w-5 mr-2 text-purple-600" />,
      category: "ML",
      title: "Machine Learning with TensorFlow",
      description: "Learn machine learning concepts and how to implement them using TensorFlow. Includes hands-on projects.",
      price: "Premium"
    }
  ];

  // Mock blog data
  const blogs = [
    {
      id: 1,
      category: "Technology",
      categoryColor: "blue",
      date: "April 10, 2023",
      title: "My Journey Learning Flutter: Tips and Tricks",
      description: "In this blog post, I share my experience learning Flutter and some useful tips and tricks I discovered along the way.",
      author: {
        name: "Rahul Sharma",
        role: "3rd Year, Computer Science",
        image: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      image: "https://miro.medium.com/v2/resize:fit:1400/1*TFZQzyVAHLVXI_wNreokGA.png"
    },
    {
      id: 2,
      category: "Event Recap",
      categoryColor: "green",
      date: "March 25, 2023",
      title: "Highlights from Google I/O Extended DTU",
      description: "A recap of the Google I/O Extended event held at DTU. Learn about the latest announcements and how they impact developers.",
      author: {
        name: "Priya Patel",
        role: "GDG Lead, DTU",
        image: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      image: "https://miro.medium.com/v2/resize:fit:1400/1*-R8GwOL9Jn-YBiMJ_2K-Bw.jpeg"
    },
    {
      id: 3,
      category: "Tutorial",
      categoryColor: "red",
      date: "March 15, 2023",
      title: "Building a Serverless API with Firebase Functions",
      description: "A step-by-step tutorial on how to build a serverless API using Firebase Cloud Functions. Perfect for beginners.",
      author: {
        name: "Amit Kumar",
        role: "4th Year, IT",
        image: "https://randomuser.me/api/portraits/men/68.jpg"
      },
      image: "https://firebase.google.com/images/social.png"
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <NavBar />
      
      {/* Hero Section */}
      <section className="bg-yellow-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Resources & Blogs</h1>
            <p className="text-lg text-gray-600 mb-6">
              Access top resources, free & paid courses to speed up your learning, and publish your own blogs to share
              your knowledge.
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
              className={`py-2 px-6 text-center ${activeTab === 'resources' ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}
              onClick={() => setActiveTab('resources')}
            >
              Resources
            </button>
            <button
              className={`py-2 px-6 text-center ${activeTab === 'blogs' ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}
              onClick={() => setActiveTab('blogs')}
            >
              Blogs
            </button>
          </div>

          {/* Resources Tab Content */}
          {activeTab === 'resources' && (
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
                        onChange={() => toggleCategoryFilter('androidDevelopment')}
                        className="h-4 w-4 text-blue-600 rounded mr-2"
                      />
                      <span className="text-sm text-gray-700">Android Development</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={categoryFilters.webDevelopment}
                        onChange={() => toggleCategoryFilter('webDevelopment')}
                        className="h-4 w-4 text-blue-600 rounded mr-2"
                      />
                      <span className="text-sm text-gray-700">Web Development</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={categoryFilters.cloudComputing}
                        onChange={() => toggleCategoryFilter('cloudComputing')}
                        className="h-4 w-4 text-blue-600 rounded mr-2"
                      />
                      <span className="text-sm text-gray-700">Cloud Computing</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={categoryFilters.machineLearning}
                        onChange={() => toggleCategoryFilter('machineLearning')}
                        className="h-4 w-4 text-blue-600 rounded mr-2"
                      />
                      <span className="text-sm text-gray-700">Machine Learning</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={categoryFilters.flutter}
                        onChange={() => toggleCategoryFilter('flutter')}
                        className="h-4 w-4 text-blue-600 rounded mr-2"
                      />
                      <span className="text-sm text-gray-700">Flutter</span>
                    </label>
                  </div>
                </div>

                {/* Resource Type */}
                <div className="border rounded-lg p-4 bg-white shadow-sm">
                  <h3 className="font-medium text-gray-800 mb-3">Resource Type</h3>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={typeFilters.courses}
                        onChange={() => toggleTypeFilter('courses')}
                        className="h-4 w-4 text-blue-600 rounded mr-2"
                      />
                      <span className="text-sm text-gray-700">Courses</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={typeFilters.tutorials}
                        onChange={() => toggleTypeFilter('tutorials')}
                        className="h-4 w-4 text-blue-600 rounded mr-2"
                      />
                      <span className="text-sm text-gray-700">Tutorials</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={typeFilters.documentation}
                        onChange={() => toggleTypeFilter('documentation')}
                        className="h-4 w-4 text-blue-600 rounded mr-2"
                      />
                      <span className="text-sm text-gray-700">Documentation</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={typeFilters.tools}
                        onChange={() => toggleTypeFilter('tools')}
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
                <div className="grid md:grid-cols-2 gap-6">
                  {resources.map(resource => (
                    <div key={resource.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="p-4 border-b bg-gray-50 flex items-center">
                        {resource.icon}
                        <span className="font-medium capitalize">{resource.type}</span>
                        <span className="ml-auto text-sm text-gray-500">{resource.category}</span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2">{resource.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-blue-600">{resource.price}</span>
                          <button className="px-4 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                            View Resource
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-center">
                  <button className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50">
                    Load More Resources
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Blogs Tab Content */}
          {activeTab === 'blogs' && (
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
                        onChange={() => toggleBlogFilter('technology')}
                        className="h-4 w-4 text-blue-600 rounded mr-2"
                      />
                      <span className="text-sm text-gray-700">Technology</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={blogFilters.tutorials}
                        onChange={() => toggleBlogFilter('tutorials')}
                        className="h-4 w-4 text-blue-600 rounded mr-2"
                      />
                      <span className="text-sm text-gray-700">Tutorials</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={blogFilters.eventRecaps}
                        onChange={() => toggleBlogFilter('eventRecaps')}
                        className="h-4 w-4 text-blue-600 rounded mr-2"
                      />
                      <span className="text-sm text-gray-700">Event Recaps</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={blogFilters.experiences}
                        onChange={() => toggleBlogFilter('experiences')}
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
                        onChange={() => toggleAuthorFilter('students')}
                        className="h-4 w-4 text-blue-600 rounded mr-2"
                      />
                      <span className="text-sm text-gray-700">Students</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={authorFilters.faculty}
                        onChange={() => toggleAuthorFilter('faculty')}
                        className="h-4 w-4 text-blue-600 rounded mr-2"
                      />
                      <span className="text-sm text-gray-700">Faculty</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={authorFilters.industryExperts}
                        onChange={() => toggleAuthorFilter('industryExperts')}
                        className="h-4 w-4 text-blue-600 rounded mr-2"
                      />
                      <span className="text-sm text-gray-700">Industry Experts</span>
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
                  {blogs.map(blog => (
                    <div key={blog.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
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
                            <span className={`text-xs bg-${blog.categoryColor}-100 text-${blog.categoryColor}-600 px-2 py-1 rounded`}>
                              {blog.category}
                            </span>
                            <span className="text-xs text-gray-500 ml-auto">{blog.date}</span>
                          </div>
                          <h3 className="font-bold text-xl mb-2">{blog.title}</h3>
                          <p className="text-gray-600 mb-4">{blog.description}</p>
                          <div className="flex items-center">
                            <img
                              src={blog.author.image}
                              alt={blog.author.name}
                              className="w-10 h-10 rounded-full mr-3"
                            />
                            <div>
                              <div className="font-medium">{blog.author.name}</div>
                              <div className="text-xs text-gray-500">{blog.author.role}</div>
                            </div>
                            <button className="ml-auto px-4 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                              Read More
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-center">
                  <button className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50">
                    Load More Blogs
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer component would be included via Layout.jsx */}
    </div>
  );
};

export default ResourcesPage;