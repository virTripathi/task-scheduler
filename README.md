# Task Scheduler

A robust application for scheduling tasks and managing your time efficiently.

## Table of Contents
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Building the Application](#building-the-application)
- [Running the Application](#running-the-application)

## Installation

1. **Clone the repository:**
    ```bash
    gh repo clone virTripathi/task-scheduler
    ```

2. **Navigate to the project directory:**
    ```bash
    cd task-scheduler
    ```

3. **Install dependencies:**
    ```bash
    npm install
    ```

## Running Tests
To ensure everything is set up correctly, run the test suite:
```bash
npm run test
```

## Building The Application
After all the tests pass, build the application:
```bash
npm run build
```

## Running The Application
After building the application, run the application using this command: 
```bash
npm run start
```

After successfully starting the application, it will run on localhost:3000.
Hit the api: localhost:3000/api/schedule-tasks
Sample Request Body: {
``` bash
    "tasks":[
        {
        "id":1,
        "duration":5,
        "deadline":"2024-11-30"
        },
        {
        "id":2,
        "duration":10,
        "deadline":"2024-11-14"
        }
    ]
}
```
Sample Response: 
``` bash
{
    "count": 2,
    "scheduledTasks": [
        {
            "id": 2,
            "duration": 10,
            "deadline": "2024-11-14"
        },
        {
            "id": 1,
            "duration": 5,
            "deadline": "2024-11-30"
        }
    ]
}
```

For further information on advanced configuration or troubleshooting, please [contact me](mailto:viratofficial07@gmail.com).
