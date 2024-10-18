import React, { useState } from 'react';
import useApiService from './useApiService'; // Import a custom hook to fetch API data

const ApiDataDisplay = () => {
  // Destructure data, loading, and error from useApiService hook
  const { data, loading, error } = useApiService();

  // State to manage the sorting order (ascending or descending)
  const [sortOrder, setSortOrder] = useState('asc');

  // Sort the data array based on the title, either ascending or descending
  const sortedData = [...data].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.title.localeCompare(b.title); // Sort ascending
    } else {
      return b.title.localeCompare(a.title); // Sort descending
    }
  });

  // Toggle function to change the sorting order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Switch between 'asc' and 'desc'
  };

  // If the API call is loading, show a loading spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div> {/* Loading spinner */}
      </div>
    );
  }

  // If there is an error, display the error message
  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 m-4" role="alert">
        <p className="font-semibold">Error</p> {/* Error heading */}
        <p>{error}</p> {/* Error message */}
      </div>
    );
  }

  // If data is available, render the data and sorting button
  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-sans mb-6 text-center text-gray-800">API Data Display</h1> {/* Main heading */}

      {/* Sort button with hover effects */}
      <div className="flex justify-center mb-6">
        <button
          onClick={toggleSortOrder} // On click, toggle the sort order
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
        >
          Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'} {/* Button text changes based on sort order */}
        </button>
      </div>

      {/* Display the sorted data in a grid format */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedData.map((item) => (
          <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
            {/* Card header */}
            <div className="bg-sky-600 text-white px-4 py-2">
              <h2 className="text-xl font-semibold truncate">{item.title}</h2> {/* Display title (truncated if too long) */}
            </div>
            {/* Card body */}
            <div className="p-4">
              <p className="text-gray-600 text-sm">{item.body}</p> {/* Display body content */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiDataDisplay;
