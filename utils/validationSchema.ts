import * as Yup from 'yup'; // Import the Yup library to handle validation schema

// Define the validation schema for form inputs using Yup
export const validationSchema = Yup.object({
    // Validation for the full name field
    fullName: Yup.string().required('Full Name is required.'), // The field should be a string and full name is required
    // Validation for the email field
    email: Yup.string().email('Invalid email format').required('Email is required.'), // The field should be a string, ensure the email is in a valid format and email is required
    // Validation for the password field
    password: Yup.string() // The field should be a string
        .min(6, 'Password must be at least 6 characters long.') // Password must be at least 6 characters
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter.')  // Password must contain at least one uppercase letter
        .required('Password is required.'), // Password is required
});