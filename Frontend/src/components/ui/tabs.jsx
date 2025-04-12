import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

// Create context
const TabsContext = createContext();

export const Tabs = ({ defaultValue, className, children, ...props }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

Tabs.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export const TabsList = ({ className, children, ...props }) => {
  return (
    <div className={`flex space-x-2 border-b ${className || ''}`} {...props}>
      {children}
    </div>
  );
};

TabsList.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export const TabsTrigger = ({ value, className, children, ...props }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;
  
  return (
    <button
      className={`px-4 py-2 font-medium ${isActive ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600 hover:text-gray-900'} ${className || ''}`}
      onClick={() => setActiveTab(value)}
      {...props}
    >
      {children}
    </button>
  );
};

TabsTrigger.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export const TabsContent = ({ value, className, children, ...props }) => {
  const { activeTab } = useContext(TabsContext);
  
  if (activeTab !== value) return null;
  
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

TabsContent.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
