import { useEffect, useState } from 'react'
import { EmployeeDetailsModalProps } from '../interfaces'
import { Modal, Box, Typography, Button } from '@mui/material';

// Modal component for displaying employee details
export const EmployeeDetailsModal = ({ employee, onClose, open }: EmployeeDetailsModalProps) => {
    // State to store the manager's full name
    const [managerName, setManagerName] = useState<string>('');

    // On component mount, retrieve the manager's details from localStorage
    useEffect(() => {
        const manager = JSON.parse(localStorage.getItem('manager') || '{}')
        if (manager) {
            setManagerName(manager.fullName) // Set the manager's name if found
        } else {
            alert('Manager not found. Please login first.'); // Show alert if manager details are missing
        }
    }, [])

    // If no employee data is passed, render nothing
    if (!employee) return null;

    // Render the modal with employee details
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                {/* Modal title */}
                <Typography variant="h6" mb={2}>
                    Employee Details
                </Typography>
                {/* Display the employee's full name */}
                <Typography variant="body1" mb={1}>
                    <strong>Full Name:</strong> {employee.fullName}
                </Typography>
                {/* Display the employee's email */}
                <Typography variant="body1" mb={1}>
                    <strong>Email:</strong> {employee.email}
                </Typography>
                {/* Display the manager's name */}
                <Typography variant="body1" mb={2}>
                    <strong>Manager:</strong> {managerName}
                </Typography>
                {/* Close button */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" onClick={onClose} sx={{ mt: 2 }}>
                        Close
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}
