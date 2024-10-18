import { useState, useEffect } from "react";

// Define the API URL from where the data will be fetched
const API_URL = "https://jsonplaceholder.typicode.com/posts";

const useApiService = () => {
	// State to store fetched data
	const [data, setData] = useState([]);

	// State to manage loading status
	const [loading, setLoading] = useState(true);

	// State to store any errors that may occur during the fetch
	const [error, setError] = useState(null);

	// useEffect to fetch data when the component mounts
	useEffect(() => {
		// Define an asynchronous function to fetch data
		const fetchData = async () => {
			try {
				// Fetch data from the API
				const response = await fetch(API_URL);

				// Check if the response is OK (status code 200)
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`); // Throw an error if the response is not OK
				}

				// Parse the response as JSON
				const result = await response.json();

				// Update the data state with the fetched result
				setData(result);
			} catch (e) {
				// In case of error, set the error state with the error message
				setError(e.message);
			} finally {
				// Set loading to false after the data fetch is complete, whether successful or not
				setLoading(false);
			}
		};

		// Call the fetchData function
		fetchData();
	}, []); // Empty dependency array ensures that the effect runs only once when the component mounts

	// Return the data, loading, and error states to be used in the consuming component
	return { data, loading, error };
};

export default useApiService;
