import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Search, Github, ExternalLink, Code, Filter, ChevronDown, X } from "lucide-react";

const apiUrl = import.meta.env.VITE_BACKENDURL;

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    webDev: false,
    appDev: false,
    uiUx: false,
    mlAi: false,
    openSource: false,
    cyberSecurity: false
  });

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/projects/`);
        if (!response.ok) throw new Error("Failed to fetch projects");
        const projects = await response.json();
        setProjects(projects);
        setFilteredProjects(projects);
      } catch (error) {
        setProjects([]);
        setFilteredProjects([]);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);
  
  

  // Filter projects whenever the filter state or search query changes
  useEffect(() => {
    if (projects.length === 0) return;

    const isAnyFilterActive = Object.values(filters).some(value => value);

    const filtered = projects.filter(project => {
      // Filter by category if any filter is active
      let matchesCategory = true;
      if (isAnyFilterActive) {
        matchesCategory = false;
        const category = project.category;

        if (filters.webDev && category === "Web Dev") matchesCategory = true;
        if (filters.appDev && category === "App Dev") matchesCategory = true;
        if (filters.uiUx && category === "UI/UX") matchesCategory = true;
        if (filters.mlAi && category === "ML/AI") matchesCategory = true;
        if (filters.openSource && category === "Open Source") matchesCategory = true;
        if (filters.cyberSecurity && category === "Cyber Security") matchesCategory = true;
      }

      // Filter by search query
      let matchesSearch = true;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        matchesSearch =
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.tags.some(tag => tag.toLowerCase().includes(query));
      }

      return matchesCategory && matchesSearch;
    });

    setFilteredProjects(filtered);
  }, [filters, searchQuery, projects]);

  // Toggle filter checkboxes
  const toggleFilter = (filterName) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      webDev: false,
      appDev: false,
      uiUx: false,
      mlAi: false,
      openSource: false,
      cyberSecurity: false
    });
    setSearchQuery("");
  };


  return (


    <div className="min-h-screen bg-green-50 flex flex-col">
      {/* Fixed Navbar */}
      <NavBar />

      {/* Hero Section */}
      <section className="bg-green-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <motion.h1
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Activity History
            </motion.h1>
            <motion.p
              className="text-lg text-gray-600 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              A showcase of all the incredible projects, tasks, and contributions by YOU. Built something cool? This is where it gets the spotlight!
            </motion.p>

            {/* Search Bar */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <input
                type="text"
                placeholder="Search projects by name, description, or technology..."
                className="w-full py-3 px-6 pl-12 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              {searchQuery && (
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchQuery("")}
                >
                  <X size={16} />
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar Filters */}
            <div className="w-full md:w-64 space-y-6">
              <div className="border rounded-lg p-4 bg-white shadow-sm">
                <h3 className="font-medium text-gray-800 mb-3">Filter Projects</h3>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.webDev}
                      onChange={() => toggleFilter('webDev')}
                      className="h-4 w-4 text-blue-600 rounded mr-2"
                    />
                    <span className="text-sm text-gray-700">Web Development</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.appDev}
                      onChange={() => toggleFilter('appDev')}
                      className="h-4 w-4 text-blue-600 rounded mr-2"
                    />
                    <span className="text-sm text-gray-700">App Development</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.uiUx}
                      onChange={() => toggleFilter('uiUx')}
                      className="h-4 w-4 text-blue-600 rounded mr-2"
                    />
                    <span className="text-sm text-gray-700">UI/UX Design</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.mlAi}
                      onChange={() => toggleFilter('mlAi')}
                      className="h-4 w-4 text-blue-600 rounded mr-2"
                    />
                    <span className="text-sm text-gray-700">ML & AI</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.openSource}
                      onChange={() => toggleFilter('openSource')}
                      className="h-4 w-4 text-blue-600 rounded mr-2"
                    />
                    <span className="text-sm text-gray-700">Open Source</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.cyberSecurity}
                      onChange={() => toggleFilter('cyberSecurity')}
                      className="h-4 w-4 text-blue-600 rounded mr-2"
                    />
                    <span className="text-sm text-gray-700">Cyber Security</span>
                  </label>
                </div>
              </div>

              {(Object.values(filters).some(value => value) || searchQuery) && (
                <button
                  onClick={resetFilters}
                  className="w-full border border-gray-300 rounded-lg py-2.5 flex items-center justify-center bg-white shadow-sm hover:bg-gray-50"
                >
                  <Filter className="mr-2 h-4 w-4" /> Reset Filters
                </button>
              )}
            </div>

            {/* Projects Grid */}
            <div className="flex-1">
              {/* Results info */}
              <div className="mb-6 flex justify-between items-center bg-white rounded-t-lg p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-800">
                  Projects <span className="text-gray-500">({filteredProjects.length})</span>
                </h2>

                {searchQuery && (
                  <div className="text-sm text-gray-600">
                    Search results for: <span className="font-medium">{searchQuery}</span>
                  </div>
                )}
              </div>
              {loading && (filteredProjects.length > 0) ? (
                <div className="flex justify-center py-20">
                  <div className="spinner"></div>
                </div>
              ) : filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <div className="h-48 relative group">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <div className="p-4 w-full flex justify-between items-center">
                            <span className="px-3 py-1 text-xs font-medium rounded-full text-white bg-blue-600">
                              {project.category}
                            </span>
                            <div className="flex gap-2">
                              {project.github && (
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
                                >
                                  <Github size={16} className="text-gray-800" />
                                </a>
                              )}
                              {project.demo && (
                                <a
                                  href={project.demo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
                                >
                                  <ExternalLink size={16} className="text-gray-800" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">{project.title}</h3>
                        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{project.description}</p>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">{project.date}</span>
                          <Link
                            to={`/project/${project.id}`}
                            className="text-blue-600 text-sm font-medium hover:underline flex items-center"
                          >
                            View Details <ChevronDown size={16} className="ml-1 transform -rotate-90" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-16 bg-white rounded-lg shadow">
                  <Code size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-800 mb-2">
                    No projects found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    We couldn't find any projects matching your current filters. Try adjusting your search criteria.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-2 bg-blue-500 text-white rounded-full font-medium"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Styles for spinner */}
      <style jsx>{`
        .spinner {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 3px solid rgba(59, 130, 246, 0.1);
          border-top-color: #3b82f6;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ProjectsPage;