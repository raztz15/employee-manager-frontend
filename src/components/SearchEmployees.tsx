import { useState } from 'react'
import axiosInstance from '../services/axiosInstance';
import { IEmployeeModel } from '../interfaces';
import { Autocomplete, Box, Container, TextField, Typography } from '@mui/material';

export const SearchEmployees = () => {
    // State to store search results from API
    const [searchResults, setSearchResults] = useState<IEmployeeModel[]>([]);
    // State to store the selected employee's details
    const [selectedEmployee, setSelectedEmployee] = useState<IEmployeeModel | null>(null);

    // Function to handle searching for employees by name
    const handleSearch = async (query: string) => {
        if (query.length < 2) return; // Only search if the query has at least 2 characters
        try {
            // Make API call to search employees by name
            const response = await axiosInstance.get<IEmployeeModel[]>(`http://localhost:5206/api/employee/search?name=${query}`);
            setSearchResults(response.data); // Set the search results state
        } catch (error) {
            console.error('Error fetching search results:', error); // Log error if API call fails
        }
    };

    // Function to handle when an employee is selected from the autocomplete
    const handleSelect = (value: IEmployeeModel | null) => {
        setSelectedEmployee(value); // Set the selected employee's details to state
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: '50px' }}>
            <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                Search Employees
            </Typography>
            {/* Autocomplete component for searching employees by name */}
            <Autocomplete
                options={searchResults}
                getOptionLabel={(option) => option.fullName} // How to display each option (full name of the employee)
                onInputChange={(_, value) => handleSearch(value)} // Trigger search on input change
                onChange={(_, value) => handleSelect(value)} // Handle selection of an employee
                renderInput={(params) => (
                    <TextField {...params} label="Search by Name" variant="outlined" fullWidth />
                )}
            />
            {/* Display selected employee details if available */}
            {selectedEmployee && (
                <Box mt={3} p={2} sx={{ border: '1px solid #ccc', borderRadius: '8px' }}>
                    <Typography variant="h6">Employee Details</Typography>
                    <Typography><strong>Name:</strong> {selectedEmployee.fullName}</Typography>
                    <Typography><strong>Email:</strong> {selectedEmployee.email}</Typography>
                </Box>
            )}
        </Container>
    )
}
