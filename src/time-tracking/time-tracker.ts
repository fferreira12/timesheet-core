import { TimesheetRepo } from "../interfaces/timesheet-repo";
import { TimeEntry } from "../interfaces/time-entry";

export class TimeTracker {

    constructor(private timesheetRepo: TimesheetRepo) { }

    async addTimeEntry(time: Date = new Date()): Promise<TimeEntry> {
        var timeWithNoSeconds = new Date(time.getTime());
        timeWithNoSeconds.setSeconds(0, 0);

        let timeEntry: TimeEntry = {
            fullTime: timeWithNoSeconds
        }

        let addedTimeEntry = await this.timesheetRepo.addTimeEntry(timeEntry);

        return addedTimeEntry;
    }

    async getMinutesWorked(startDate?: Date, endDate?: Date): Promise<number> {
        let timeEntries: TimeEntry[] = await this.timesheetRepo.getTimeEntries(startDate, endDate);

        //should have even number of time entries
        if(timeEntries.length % 2 !== 0) {
            throw new Error("Must have an even number of time entries in a day to calculate amount of time, but got " + timeEntries.length);
        }

        let minutes = 0;
        for(let i = 1; i < timeEntries.length; i += 2) {
            let timeDiffMs = timeEntries[i].fullTime.getTime() - timeEntries[i-1].fullTime.getTime()
            let timeDiffMinute = timeDiffMs / (1000*60);
            minutes += timeDiffMinute;
        }
        return minutes;
    }
    
}
