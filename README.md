# Zenica Bus Tracking Application

This application is designed for tracking buses in the city of Zenica, Bosnia and Herzegovina.

## Getting Started

Before running the project, make sure to set up the necessary environment variables for the frontend:

### Create the following environment files in the `frontend` folder:

1. **For local development**, create a `.env.local` file with the following content:
    ```env
    API_URL=http://localhost:3001
    ```

2. **For production**, create a `.env.production` file with the following content:
    ```env
    API_URL=https://production-server-url.com
    ```

These environment files are necessary to configure the API URL based on the environment you're working in.

### Prerequisites

Make sure you have the following installed:
- Node.js
- npm

### Installation

1. **Set up the Frontend:**
    ```bash
    cd frontend
    npm i
    npm run dev
    ```

2. **Set up the Backend:**
    ```bash
    cd backend
    npm i
    npm run server
    ```
    
### Running the Application

After setting up the frontend and backend, you can access the application at:

http://localhost:3000

## How to Contribute

1. Click the **Fork** button at the top right corner of the repository page on GitHub.
2. GitHub will create a copy (fork) of the project in your account.
2. **Clone** the forked repository to your local machine:
    ```bash
    git clone https://github.com/your-username/project-name.git
    ```
3. **Create a new branch** for your changes:
    
    git checkout -b branch-name
    
4. **Make your changes** to the code.
5. **Add and commit** your changes:
    ```bash
    git add .
    git commit -m "Description of your changes"
    ```
6. **Push** your changes to your fork:
    ```bash
    git push origin branch-name
    ```
7. **Create a Pull Request**:
    - Go to your forked repository on GitHub.
    - Click the **Contribute** button.
    Click the **Open pull request** button.
    - Compare your changes with the main branch of the original repository.
    - Add a description of your changes and click **Create pull request**.

## Contribution Guidelines

- Follow the project's coding style and conventions.
- Add tests for any new features.
- Update the documentation as needed.
- Be respectful and constructive in your communication.

## Contact

If you have any questions or need assistance, feel free to contact us at info@zeforge.ba.

Thank you for contributing!