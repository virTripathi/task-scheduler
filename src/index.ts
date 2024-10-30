// src/app.ts

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { scheduleTasks } from './TaskScheduler';
import { Task } from './types';

const app = express();
app.use(bodyParser.json());
const validateTasks = (req: Request, res: Response, next: () => void) => {
    const tasks: Task[] = req.body.tasks;

    if (!Array.isArray(tasks)) {
        return res.status(400).json({ error: 'Tasks are required.' });
    }

    for (const task of tasks) {
        if (typeof task.id === 'undefined' || typeof task.duration === 'undefined' || typeof task.deadline === 'undefined') {
            return res.status(400).json({ error: 'Each task must have an id, duration, and deadline.' });
        }

        if (typeof task.id !== 'number' && typeof task.id !== 'string') {
            return res.status(400).json({ error: 'Task id must be a number or string.' });
        }

        if (typeof task.duration !== 'number' || task.duration <= 0) {
            return res.status(400).json({ error: 'Task duration must be a positive number.' });
        }

        if (typeof task.deadline !== 'string' || isNaN(Date.parse(task.deadline))) {
            return res.status(400).json({ error: 'Task deadline must be a valid date string.' });
        }
    }
    next();
};

app.post('/api/schedule-tasks',validateTasks as any, (req: Request, res: Response) => {
    const tasks: Task[] = req.body.tasks;
    const result = scheduleTasks(tasks);

    res.json({
        count: result.scheduledTasks.length,
        scheduledTasks: result.scheduledTasks.map((task:Task) => ({
            id: task.id,
            duration: task.duration,
            deadline: task.deadline
        }))
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
