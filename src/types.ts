export interface Task {
    id: number;
    duration: number;
    deadline: string;
}

export interface ScheduledTask extends Task {
    deadlineDays: number;
}

export interface ScheduleResult {
    scheduledTasks: ScheduledTask[];
    totalTime: number;
}