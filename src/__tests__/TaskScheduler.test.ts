import { scheduleTasks } from '../TaskScheduler';
import { Task, ScheduleResult } from '../types';

describe('Task Scheduler', () => {
    test('Test 1', () => {
        const tasks: Task[] = [
            { id: 1, duration: 2, deadline: "2024-11-01T12:00:00Z" },
            { id: 2, duration: 1, deadline: "2024-11-01T11:00:00Z" },
            { id: 3, duration: 3, deadline: "2024-11-01T14:00:00Z" },
            { id: 4, duration: 2, deadline: "2024-11-01T15:00:00Z" }
        ];        

        const result: ScheduleResult = scheduleTasks(tasks);
        expect(result.scheduledTasks.length).toBe(1);
        expect(result.scheduledTasks).toEqual(expect.arrayContaining([
            expect.objectContaining({"deadline": "2024-11-01T11:00:00Z", "deadlineDays": 1, "duration": 1, "id": 2}),
        ]));

        expect(result.totalTime).toBe(1);
    });

    test('Test 2', () => {
        const tasks: Task[] = [
            { id: 1, duration: 2, deadline: "2024-11-04T12:00:00Z" },
            { id: 2, duration: 1, deadline: "2024-11-02T11:00:00Z" },
            { id: 3, duration: 3, deadline: "2024-11-03T14:00:00Z" },
            { id: 4, duration: 2, deadline: "2024-11-10T15:00:00Z" }
        ];

        const result: ScheduleResult = scheduleTasks(tasks);

        expect(result.scheduledTasks.length).toBe(3);
        expect(result.scheduledTasks).toEqual(expect.arrayContaining([
            expect.objectContaining({ id: 2 }),
            expect.objectContaining({ id: 1 }),
            expect.objectContaining({ id: 4 })
        ]));
        expect(result.totalTime).toBe(5);
    });
});
