import { TimesheetRepo } from '../../src/interfaces/timesheet-repo';
import { TimeEntry } from '../../src/interfaces/time-entry';

export class TimesheetRepoMock implements TimesheetRepo {
    
    private timeEntries: TimeEntry[] = [];

    addTimeEntry(timeEntry: TimeEntry): Promise<TimeEntry> {
        this.timeEntries.push(timeEntry);
        return Promise.resolve(timeEntry);
    }    
    getTimeEntries(startDate?: Date, endDate?: Date): Promise<TimeEntry[]> {
        let filteredEntries = this.timeEntries;
        if(startDate) {
            let startDateStartOfDay = new Date(startDate.getTime());
            startDateStartOfDay.setHours(0);
            startDateStartOfDay.setMinutes(0);
            startDateStartOfDay.setSeconds(0);
            filteredEntries = filteredEntries.filter(entry => {
                return entry.fullTime.getTime() >= startDateStartOfDay.getTime();
            });
        }
        if(endDate) {
            filteredEntries = filteredEntries.filter(entry => {
                let endDateEndOfDay = new Date(endDate.getTime());
                endDateEndOfDay.setHours(23);
                endDateEndOfDay.setMinutes(59);
                endDateEndOfDay.setSeconds(59);
                return entry.fullTime.getTime() <= endDateEndOfDay.getTime();
            });
        }
        
        return Promise.resolve(this.timeEntries);
    }
    updateTimeEntry(oldTimeEntry: TimeEntry, newTimeEntry: TimeEntry): Promise<TimeEntry> {
        let index = this.timeEntries.findIndex(te => te.id === oldTimeEntry.id);
        if(index == -1) {
            return Promise.reject({
                error: "Could not find the time entry to update"
            })
        };
        this.timeEntries.splice(index, 1, newTimeEntry);
        return Promise.resolve(newTimeEntry);
    }
    deleteTimeEntry(timeEntry: TimeEntry): Promise<boolean> {
        let index = this.timeEntries.findIndex(te => te.id === timeEntry.id);
        if(index == -1) {
            return Promise.reject({
                error: "Could not find the time entry to delete"
            })
        };
        this.timeEntries.splice(index, 1);
        return Promise.resolve(true);
    }


}
