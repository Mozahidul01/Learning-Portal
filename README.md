# Learning Portal Application

This project is an example application that showcases how to use React and Redux Toolkit (RTK) to build a role-based CRUD application. The project includes two portals: the Admin Portal and the Student Portal. The Admin Portal is designed for authorized users who can manage various items such as videos, quizzes, and assignments, and assign grades for assignments. The Student Portal is designed for users who can view available videos and take quizzes and assignments. The application uses Redux for state management, and RTK-Query to fetch data from the server.

## Prerequisites

Before you can run this project, you need to have Node.js installed on your machine.

### Installing

To install the project, follow these steps:

1. Clone this repository to your local machine.
2. Open your terminal and navigate to the project directory.
3. Run the following command to install the project dependencies:

``` bash
npm install
```

### Running the App

To run the application, follow these steps:

- In your terminal, navigate to the project directory and then go to the server folder.
- Run the following command to install the server dependencies:

``` bash
npm install
```

- Run the following command to start the server:

``` bash
npm start
```

- Now, navigate back to the project directory and run the following command to start the development server:

``` bash
npm start
```

- Open your browser and go to `http://localhost:3000/` to see the app.

## Project Structure

- `server`: Contain JSON Demo server.
- `src/`
  - `app/`: Contains redux store.
  - `components/`: Contains all the React components used in the app.
    - `adminPortal/`: Contains all the Admin components used in the app.
    - `common/`: Contains all the Common components that are shared between both the Student and Admin Portals.
    - `studentPortal/`: Contains all the Student components used in the app.
    - `ui/`: Contains all the utility components used in the app.
  - `features/`: Contains all the Redux features.
  - `hooks/`: Contains all the Custom Hooks.
  - `pages/`: Contains all the Routes of the app.
    - `adminPortal/`: Contains all the Routes of Admin Portal.
    - `Routes/`: Contains all the logic and functionality of React Router Dom.
    - `studentPortal/`: Contains all the Routes of Student Portal.
  - `App.js`: The main component that renders all other components.
  - `index.css`: Contains all the necessary CSS for this application.
  - `index.js`: The application's entry point that renders the App component wrapped with the Provider component to provide the Redux store to the entire application.

## Built With

The Learning Portal Application was built with the following technologies:

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces, which allows developers to create reusable UI components and manage application state efficiently.
- [Redux](https://redux.js.org/) - A predictable state container for JavaScript apps, which provides a centralized location for storing and updating application state, making it easier to manage complex data flows and interactions.
- [Redux Toolkit](https://redux-toolkit.js.org/) - An opinionated, efficient, and easy-to-use library for Redux that reduces boilerplate and provides powerful abstractions for managing application state. It includes utilities for simplifying common Redux use cases like store setup, creating reducers and actions, and handling asynchronous data fetching.
- [React Router Dom](https://reactrouter.com/en/main) - A popular library for declaratively routing web applications in React.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework that provides a set of pre-defined classes for building responsive and customizable UI components quickly and easily.

## Author

The author of this project is Mozahidul Islam. You can find more information about him on [GitHub](https://github.com/mozahidul01).

## Acknowledgments

This project was created as a sample project to showcase how to use React and RTK-Query together to build a role-based CRUD app. It was created as an assignment for the LWS - Think in a redux way course.
