import React, { useState } from 'react'
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    Alert,
} from "@mui/material";
import axiosInstance from "../services/axiosInstance";
import { ILoginError } from '../interfaces';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    // useNavigate hook to navigate programmatically after login
    const navigate = useNavigate()

    // Local state to store email, password, success message, and error message
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Handles the login form submission
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent page refresh on form submit
        setMessage(null); // Reset message
        setError(null); // Reset error
        try {
            // Send a POST request to the login endpoint with email and password
            const response = await axiosInstance.post("/manager/login", {
                email,
                password,
            });
            // If login is successful, display a success message and store manager data in localStorage
            setMessage(`Welcome, ${response.data.manager.fullName}!`);
            localStorage.setItem('manager', JSON.stringify(response.data.manager))
            // Navigate to the employee management dashboard page after successful login
            navigate('/employee-management-dashboard')
        } catch (err: unknown) {
            // If login fails, display an error message
            setError((err as ILoginError).response?.data || "Login failed");
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                component="form"
                onSubmit={handleLogin}
                sx={{
                    mt: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {/* Title of the page */}
                <Typography component="h1" variant="h5">
                    Manager Login
                </Typography>
                {/* Email input field */}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {/* Password input field */}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {/* Login button */}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Login
                </Button>
                {/* Show success message if login is successful */}
                {message && <Alert severity="success">{message}</Alert>}
                {/* Show error message if login fails */}
                {error && <Alert severity="error">{error}</Alert>}
            </Box>
        </Container>
    )
}
