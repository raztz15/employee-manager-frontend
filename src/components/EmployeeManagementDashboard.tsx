import { Formik, Form, ErrorMessage, Field } from 'formik';
import axios from 'axios';
import { Button, TextField, Container, Typography, Box, Card, CardContent } from '@mui/material';
import { IEmployeeModel, ILoginError } from '../interfaces';
import { validationSchema } from '../../utils/validationSchema';
import { useEffect, useState } from 'react';
import { SearchEmployees } from './SearchEmployees';
import { Link } from 'react-router-dom';

export const EmployeeManagementDashboard = () => {
    // State to hold initial employee form values
    const [initialEmployeeValues, setInitialEmployeeValues] = useState({
        fullName: '',
        email: '',
        password: '',
        managerId: ''
    });
    // State to store the manager's name
    const [managerName, setManagerName] = useState<string>();

    useEffect(() => {
        // Fetch the logged-in manager's data from localStorage
        const manager = JSON.parse(localStorage.getItem('manager') || '')
        if (manager) {
            // Set the managerId in the initial form values
            setInitialEmployeeValues(prevInitialEmployeeValues => ({ ...prevInitialEmployeeValues, managerId: manager.id }))
            setManagerName(manager.fullName)
        } else {
            // Alert the user if no manager data is found
            alert('Manager not found. Please login first.');
        }
    }, [])

    const handleSubmit = async (values: IEmployeeModel) => {
        try {
            // Send a POST request to the server to create an employee
            const response = await axios.post('http://localhost:5206/api/employee/create', values);
            if (response.status === 200) {
                // Notify the user of successful creation
                alert('Employee created successfully!');
            }
        } catch (error: unknown) {
            // Handle and display any errors from the server
            alert('Failed to create employee: ' + (error as ILoginError).response.data);
        }
    };

    // Render a loading indicator until managerId is available
    if (!initialEmployeeValues.managerId) {
        return <div>Loading...</div>;
    }

    return (
        <Container maxWidth="lg" sx={{ marginTop: '50px' }}>
            <Card>
                <CardContent>
                    {/* Welcome message with the manager's name */}
                    <Typography variant="h4" sx={{ marginBottom: '20px', textAlign: 'center' }}>
                        Welcome, {managerName}!
                    </Typography>
                    <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
                        {/* Left Column: SearchEmployees */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '345px', height: '100%' }}>
                            <Box>
                                <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                                    Search Employees
                                </Typography>
                                <SearchEmployees />
                            </Box>
                            {/* Button to navigate to Manage Employees */}
                            <Button
                                component={Link}
                                to="/manage-employees"
                                variant="contained"
                                color="secondary"
                                sx={{ marginTop: '20px', width: '100%', alignSelf: 'flex-end' }}
                            >
                                View & Manage Employees
                            </Button>
                        </Box>

                        {/* Right Column: Create Employee Form */}
                        <Box>
                            <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                                Create Employee
                            </Typography>
                            <Formik
                                initialValues={initialEmployeeValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting, setFieldValue, errors, touched }) => (
                                    <Form>
                                        {/* Full Name Input */}
                                        <div>
                                            <TextField
                                                fullWidth
                                                label="Full Name"
                                                name="fullName"
                                                variant="outlined"
                                                margin="normal"
                                                onChange={(e) => setFieldValue('fullName', e.target.value)}
                                                error={Boolean(errors.fullName && touched.fullName)}
                                                helperText={<ErrorMessage name="fullName" />}
                                            />
                                        </div>
                                        {/* Email Input */}
                                        <div>
                                            <TextField
                                                fullWidth
                                                label="Email"
                                                name="email"
                                                type="email"
                                                variant="outlined"
                                                margin="normal"
                                                onChange={(e) => setFieldValue('email', e.target.value)}
                                                error={Boolean(errors.email && touched.email)}
                                                helperText={<ErrorMessage name="email" />}
                                            />
                                        </div>
                                        {/* Password Input */}
                                        <div>
                                            <TextField
                                                fullWidth
                                                label="Password"
                                                name="password"
                                                type="password"
                                                variant="outlined"
                                                margin="normal"
                                                onChange={(e) => setFieldValue('password', e.target.value)}
                                                error={Boolean(errors.password && touched.password)}
                                                helperText={<ErrorMessage name="password" />}
                                            />
                                        </div>
                                        {/* Hidden Field for Manager ID */}
                                        <Field name="managerId" type="hidden" value={initialEmployeeValues.managerId} />
                                        <Box mt={2}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{ width: '100%' }}
                                                disabled={isSubmitting}
                                            >
                                                Create Employee
                                            </Button>
                                        </Box>
                                    </Form>
                                )}
                            </Formik>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    )
}
