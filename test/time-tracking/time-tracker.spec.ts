import { expect } from "chai";

import { TimeTracker } from "../../src/time-tracking/time-tracker";
import { TimesheetRepo } from "../../src/interfaces/timesheet-repo";
import { TimesheetRepoMock } from "../mocks/timesheet-repo-mock";

describe("TimeTracker Object", () => {

    let timeTracker: TimeTracker;
    let timesheetRepo: TimesheetRepo;

    beforeEach(() => {
        timesheetRepo = new TimesheetRepoMock();

        timeTracker = new TimeTracker(timesheetRepo);
    })

    it("should allow adding time entry - no argument", async () => {
        let addedTimeEntry = await timeTracker.addTimeEntry();
        expect(addedTimeEntry).to.be.not.null;
        expect(addedTimeEntry.fullTime).to.be.not.null;
    });

    it("should allow adding time entry - with argument", async () => {
        let time = new Date();
        let addedTimeEntry = await timeTracker.addTimeEntry(time);
        
        expect(addedTimeEntry).to.be.not.null;
        expect(addedTimeEntry.fullTime.getFullYear()).to.equals(time.getFullYear());
        expect(addedTimeEntry.fullTime.getMonth()).to.equals(time.getMonth());
        expect(addedTimeEntry.fullTime.getDay()).to.equals(time.getDay());
        expect(addedTimeEntry.fullTime.getHours()).to.equals(time.getHours());
        expect(addedTimeEntry.fullTime.getMinutes()).to.equals(time.getMinutes());
        expect(addedTimeEntry.fullTime.getSeconds()).to.equals(0);
    });

    it("should get minutes worked", async () => {
        let time1 = new Date(2020, 1, 1, 7, 0, 1);
        let time2 = new Date(2020, 1, 1, 12, 0, 59);
        let time3 = new Date(2020, 1, 1, 13, 30, 1);
        let time4 = new Date(2020, 1, 1, 16, 30, 30);
        await timeTracker.addTimeEntry(time1);
        await timeTracker.addTimeEntry(time2);
        await timeTracker.addTimeEntry(time3);
        await timeTracker.addTimeEntry(time4);
        
        let minutesWorked = await timeTracker.getMinutesWorked();
        
        expect(minutesWorked).to.be.not.null;
        expect(minutesWorked).to.equals(8*60);
    });
});
