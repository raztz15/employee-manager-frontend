import React, { useEffect, useState } from 'react'
import { Modal, Box, Button, TextField, Typography } from '@mui/material';
import { EditEmployeeModalProps, IEmployeeModel } from '../interfaces';
import axiosInstance from '../services/axiosInstance';

// Modal component for editing employee details
export const EditEmployeeModal = ({ employee, onClose, onUpdateEmployee, open }: EditEmployeeModalProps) => {
    // Local state to manage the form data for the employee being edited
    const [formData, setFormData] = useState<IEmployeeModel | null>(null);

    // Populate the form data when the `employee` prop changes
    useEffect(() => {
        if (employee) {
            setFormData(employee);
        }
    }, [employee]);

    // Handle input changes and update the corresponding field in formData
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (formData) {
            setFormData({ ...formData, [name]: value }); // Update only the field that changed
        }
    };

    // Submit the updated employee data to the server
    const handleSubmit = async () => {
        if (formData) {
            try {
                // Send a PUT request to update the employee details
                const response = await axiosInstance.put(`http://localhost:5206/api/employee/update/${formData.id}`, formData);
                alert('Employee updated successfully!');
                onUpdateEmployee(response.data.employee);  // Notify the parent component about the update
                onClose();  // Close the modal after successful submission
            } catch (error) {
                alert('Failed to update employee.'); // Display an error message
                console.error(error);
            }
        }
    };

    // If no form data is available, render nothing (prevents rendering before data is set)
    if (!formData) return null;

    // Render the modal for editing employee details
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                padding: 4,
                width: 400,
                boxShadow: 24,
            }}>
                {/* Title of the modal */}
                <Typography variant="h6" sx={{ marginBottom: '20px' }}>
                    Edit Employee
                </Typography>
                {/* Input field for Full Name */}
                <TextField
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                />
                {/* Input field for Email */}
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                />
                {/* Input field for Password */}
                <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                />
                {/* Save button */}
                <Box sx={{ marginTop: '20px' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{ width: '100%' }}
                    >
                        Save Changes
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}
