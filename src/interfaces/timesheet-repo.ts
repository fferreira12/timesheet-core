import { TimeEntry } from "./time-entry";

export interface TimesheetRepo {

    addTimeEntry(timeEntry: TimeEntry): Promise<TimeEntry>;
    getTimeEntries(startDate?: Date, endDate?: Date): Promise<TimeEntry[]>;
    updateTimeEntry(oldTimeEntry: TimeEntry, newTimeEntry: TimeEntry): Promise<TimeEntry>;
    deleteTimeEntry(timeEntry: TimeEntry): Promise<boolean>;

}
