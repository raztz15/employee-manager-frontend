import { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Box } from '@mui/material';
import { IEmployeeModel } from '../interfaces';
import axiosInstance from '../services/axiosInstance';
import { EmployeeDetailsModal } from './EmployeeDetailsModal';
import { EditEmployeeModal } from './EditEmployeeModal';

export const ManageEmployees = () => {
    // State for managing employees, managerId, selected employee, modals, and loading state
    const [employees, setEmployees] = useState<IEmployeeModel[]>([]);
    const [managerId, setManagerId] = useState<string | null>(null);
    const [selectedEmployee, setSelectedEmployee] = useState<IEmployeeModel | null>(null);  // State for selected employee
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for Edit modal visibility
    const [isViewModalOpen, setIsViewModalOpen] = useState(false); // State for View details modal visibility

    // Fetch the manager ID from localStorage on component mount
    useEffect(() => {
        // Get manager ID from localStorage
        const manager = JSON.parse(localStorage.getItem('manager') || '{}');
        if (manager.id) {
            setManagerId(manager.id);
            fetchEmployees(manager.id); // Fetch employees associated with the manager
        } else {
            alert('Manager not found. Please login first.');
        }
    }, []);

    // Fetch employees from the server using the manager ID
    const fetchEmployees = async (managerId: string) => {
        try {
            const response = await axiosInstance.get(`http://localhost:5206/api/employee/manager/${managerId}`);
            setEmployees(response.data); // Set the fetched employees in state
        } catch (error: unknown) {
            alert('Failed to fetch employees.');
            console.error(error) // Log the error to the console
        }
    };

    // Open the "View Details" modal and set the selected employee
    const handleViewDetails = (employee: IEmployeeModel) => {
        setSelectedEmployee(employee);  // Set selected employee for viewing details
        setIsViewModalOpen(true); // Open the View Details modal
    };

    // Close the Edit modal and clear the selected employee
    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedEmployee(null);  // Clear the selected employee
    };

    // Close the View Details modal and clear the selected employee
    const handleCloseViewModal = () => {
        setIsViewModalOpen(false);
        setSelectedEmployee(null);  // Clear the selected employee
    };

    // Update the employee in the employee list after editing
    const handleUpdateEmployee = (updatedEmployee: IEmployeeModel) => {
        setEmployees((prevEmployees) =>
            prevEmployees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp)
        );  // Update the employee in the list
    };

    // Open the Edit modal and set the selected employee for editing
    const handleEdit = (employee: IEmployeeModel) => {
        setSelectedEmployee(employee);  // Set selected employee for editing
        setIsEditModalOpen(true);  // Open the Edit modal
    };

    // Delete the selected employee from the list and from the server
    const handleDelete = async (employeeId: string | undefined) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
        if (confirmDelete) {
            try {
                await axiosInstance.delete(`http://localhost:5206/api/employee/delete/${employeeId}`);
                alert('Employee deleted successfully!');
                setEmployees((prevEmployees) => prevEmployees.filter(emp => emp.id !== employeeId)); // Remove employee from list
            } catch (error) {
                alert('Failed to delete employee.');
                console.error(error) // Log the error to the console
            }
        }
    };

    // If managerId is not yet set, show loading message
    if (!managerId) {
        return <div>Loading...</div>;
    }

    return (
        <Container maxWidth="md" sx={{ marginTop: '50px' }}>
            <Typography variant="h4" sx={{ marginBottom: '20px', textAlign: 'center' }}>
                Manage Employees
            </Typography>
            <Box>
                {employees.length === 0 ? (
                    <Typography variant="body1">No employees found.</Typography> // Display message if no employees are available
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employees.map((employee) => (
                                <TableRow key={employee.id}>
                                    <TableCell>{employee.fullName}</TableCell>
                                    <TableCell>{employee.email}</TableCell>
                                    <TableCell>
                                        {/* View details button */}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleViewDetails(employee)}  // <-- View details button
                                            sx={{ marginRight: '10px' }}
                                        >
                                            View Details
                                        </Button>
                                        {/* Edit button */}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleEdit(employee)}
                                            sx={{ marginRight: '10px' }}
                                        >
                                            Edit
                                        </Button>
                                        {/* Delete button */}
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleDelete(employee.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </Box>
            {/* Employee Details Modal */}
            <EmployeeDetailsModal
                open={isViewModalOpen}
                onClose={handleCloseViewModal}
                employee={selectedEmployee}  // Pass selected employee to modal
            />
            {/* Edit Employee Modal */}
            <EditEmployeeModal
                open={isEditModalOpen}
                onClose={handleCloseEditModal}
                employee={selectedEmployee}  // Pass the selected employee
                onUpdateEmployee={handleUpdateEmployee}  // Pass the handler for updating the employee
            />
        </Container>
    )
}
