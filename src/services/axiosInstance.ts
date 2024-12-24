import axios from "axios"; // Import axios to create an instance for HTTP requests

// Create a customized axios instance with predefined configuration
const axiosInstance = axios.create({
    baseURL: "http://localhost:5206/api", // The base URL for your API. Replace with your actual API URL
    headers: {
        "Content-Type": "application/json", // Set the default content type to JSON for requests
    },
});

// Export the axios instance so it can be used throughout the app for API calls
export default axiosInstance;