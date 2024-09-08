import { Event } from "../src/core/event";
import { DAY, Schedule, TimeRange } from "../src/core/schedule";

describe('Event', () => {
  describe('end of month', () => {
    it('should get end of month january', () => {
      const start = new Date('2024-01-01');
      const event = new Event();
      const eom = event.getEom(start);
      expect(eom).toEqual(new Date('2024-01-31'))
    })

    it('should get end of month pebruary', () => {
      const start = new Date('2024-02-01');
      const event = new Event();
      const eom = event.getEom(start);
      expect(eom).toEqual(new Date('2024-02-29'))
    })
  })

  describe('get day in param slot', () => {
    it('should get all day in august', () => {
      const param = {
        month: new Date('2024-08')
      };
      const event = new Event();
      const day = event.getDayInSlotParam(param);
      console.log('day', day)
    })

    it('should get specific day in august', () => {
      const param = {
        month: new Date('2024-08'),
        date: new Date('2024-08-01')
      }
      const event = new Event();
      const day = event.getDayInSlotParam(param);
      console.log('day', day);
    })
  })

  describe('available slot', () => {
    it('should get 4 slot when the available time only monday at 17:00', () => {
      const hour = new TimeRange()
      hour.start = 17 * 60 * 60;
      hour.end = 18 * 60 * 60;

      const schedule = new Schedule();
      const startDate = new Date(0)
      const endDate = new Date(startDate.setDate(30));
      schedule.dateRange = {
        start: startDate,
        end: endDate,
      }
      schedule.availableHours = [
        {
          day: DAY.MONDAY,
          hours: [
            hour
          ]
        }
      ]

      const event = new Event();
      event.duration = 60 * 60;
      event.name = 'Test name'
      event.schedule = schedule

      console.log('event', JSON.stringify(event, null, 2))
    })
  })
})