import { Formik, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import { validationSchema } from '../../utils/validationSchema';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { ILoginError, IManagerModel } from '../interfaces';

export const RegisterManagerForm = () => {

    const navigate = useNavigate(); // Initialize the navigate function

    // Handle form submission
    const handleSubmit = async (values: IManagerModel) => {
        try {
            // Send the form data to the server via POST request
            const response = await axios.post('http://localhost:5206/api/manager/register', values);
            alert(response.data.message); // Show the server's success message
            navigate('/login'); // Redirect to the login page after successful registration
        } catch (error: unknown) {
            // Handle errors if the POST request fails
            const errorMessage = (error as ILoginError)?.response?.data || 'An unexpected error occurred.'; // Check if there is a response error
            alert(errorMessage); // Show the error message to the user
        }
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: '50px' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '20px',
                    boxShadow: 3,
                    borderRadius: 2,
                    backgroundColor: '#fff',
                }}
            >
                {/* Form title */}
                <Typography variant="h4" sx={{ marginBottom: '20px' }}>
                    Register Manager
                </Typography>
                {/* Formik for form handling */}
                <Formik
                    initialValues={{ fullName: '', email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, setFieldValue, errors, touched }) => (
                        <Form style={{ width: '100%' }}>
                            {/* Full Name Field */}
                            <div>
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    name="fullName"
                                    variant="outlined"
                                    margin="normal"
                                    onChange={(e) => setFieldValue('fullName', e.target.value)} // Update form value on change
                                    error={Boolean(errors.fullName && touched.fullName)} // Check if there's an error
                                    helperText={<ErrorMessage name="fullName" />} // Show error message if present
                                />
                            </div>
                            {/* Email Field */}
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
                            {/* Password Field */}
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
                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ width: '100%', marginTop: '20px' }}
                                disabled={isSubmitting}
                            >
                                Register
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    )
}
