import { Task, ScheduleResult, ScheduledTask } from './types';
function convertDeadlineToDays(task: Task, startTime: string): number {
    const deadlineDate = new Date(task.deadline);
    const startDate = new Date(startTime);
    const daysDifference = Math.floor((deadlineDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return daysDifference;
}

export function scheduleTasks(tasks: Task[]): ScheduleResult {
    const startTime = new Date().toISOString();
    const tasksWithDeadlineDays: ScheduledTask[] = tasks.map(task => ({
        ...task,
        deadlineDays: convertDeadlineToDays(task, startTime)
    }));

    tasksWithDeadlineDays.sort((a, b) => a.deadlineDays - b.deadlineDays);
    
    let scheduledTasks: ScheduledTask[] = [];
    let totalTime = 0;

    for (let task of tasksWithDeadlineDays) {
        if (totalTime + task.duration <= task.deadlineDays) {
            scheduledTasks.push(task);
            totalTime += task.duration;
        }
    }

    return {
        scheduledTasks,
        totalTime
    };
}
