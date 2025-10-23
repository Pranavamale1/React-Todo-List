React Todo List Application

<br />

<p align="center">
<img src="https://www.google.com/search?q=https://img.shields.io/badge/React-20232A%3Fstyle%3Dfor-the-badge%26logo%3Dreact%26logoColor%3D61DAFB" alt="React">
<img src="https://www.google.com/search?q=https://img.shields.io/badge/Vite-B73BFE%3Fstyle%3Dfor-the-badge%26logo%3Dvite%26logoColor%3DFFD62E" alt="Vite">
<img src="https://www.google.com/search?q=https://img.shields.io/badge/CSS3-1572B6%3Fstyle%3Dfor-the-badge%26logo%3Dcss3%26logoColor%3Dwhite" alt="CSS">
</p>

A simple yet powerful Todo List application built with React, demonstrating core concepts of state management, immutability, and component-based UI.

🚀 Features

This application allows users to:

Create: Add new tasks to the list.

Read: View all the tasks in a clean, modern interface.

Update: Edit the text of an existing task.

Delete: Remove tasks from the list.

🧠 Core React Concepts Implemented

This project was built to master the fundamental concepts of React:

useState Hook: Used for managing all component-level state, including the task list array (todoArr) and the new task input field (todoValue).

Controlled Components: The input field is a controlled component, where its value is tied directly to the React state (value={todoValue}) and updated via onChange.

Immutability: All state updates are performed immutably. Instead of modifying the state array directly (like using .push()), we create new arrays using non-mutating methods:

Adding Tasks: setTodoArr([...todoArr, { ... }]) (Spread Syntax)

Deleting Tasks: setTodoArr(prevArr => prevArr.filter(...))

Updating Tasks: setTodoArr(prevArr => prevArr.map(...))

List Rendering & Keys: The todoArr.map() method is used to render the list of tasks. The uuid package is used to generate a unique key for each task, which is crucial for React's reconciliation process.

Event Handling: Demonstrates handling user events like onClick (for buttons) and onChange (for the input field).

🛠️ Technologies Used

React: A JavaScript library for building user interfaces.

Vite: A modern frontend build tool for fast development.

uuid: For generating unique identifiers (IDs) for each task.

CSS: Styled with a clean, external CSS file for a modern look and feel.

🏃‍♂️ How to Run Locally

To get a local copy up and running, follow these simple steps.

Prerequisites

You must have Node.js (which includes npm) installed on your machine.

Installation & Setup

Clone the repository:

git clone https://github.com/Pranavamale1/React-Todo-List.git


Navigate to the project directory:

cd react-todolist


Install NPM packages:
(This will install React, Vite, and uuid)

npm install


Run the development server:

npm run dev


Open http://localhost:5173  in your browser to see the app.
