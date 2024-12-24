# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

## Employee Manager Frontend

This is the frontend of the Employee Manager application, which provides a user-friendly interface to interact with the employee management API. It allows users to register managers, search for employees, and view employee details. The frontend is built using React and styled with Material UI.

## Features

# 1. Register Manager

- A form that allows new managers to sign up by providing their full name, email, and password.
- Includes validation for required fields, proper email format, and password strength.
- After successful registration, users are redirected to the login page.

## 2. Search Employees

- Users can search for employees by name using the autocomplete search feature.
- As the user types, the search results dynamically filter and display matching employees.
- Upon selecting an employee from the list, the application displays the employee's full name and email.

## 3. Form Validation

- All forms include real-time validation using Formik and Yup.
- Error messages are displayed below the relevant input fields, guiding users to correct their inputs.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- Material UI: A React component library for designing beautiful UIs.
- Formik: A library for building and managing forms in React.
- Yup: A schema validation library for JavaScript.
- Axios: A promise-based HTTP client for making API requests.
- React Router: For handling navigation between different pages in the app.

## Installation

## 1. Clone this repository:

git remote add origin https://github.com/raztz15/employee-manager-frontend.git

## 2. Install the necessary dependencies:

cd employee-manager-client
npm install

## 3. Start the development server:

npm run dev
This will start the frontend application on http://localhost:5173/

# How to Use

## 1. Register as a Manager:

- Navigate to the "Register Manager" page.

* Fill in your full name, email, and password.
* Click "Register" to create your account and be redirected to the login page.

## 2. Search for Employees:

- Navigate to the "Search Employees" page.

* Type an employee's name into the search box to view matching results.
* Select an employee from the list to see their details.
