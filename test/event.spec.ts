import { AvailableDay, Event } from "../src/core/event";
import { DAY, Schedule, TimeRange } from "../src/core/schedule";
import { ONE_HOUR } from "../src/core/utils";

describe('Event', () => {
  describe('end of month', () => {
    it('should get end of month january', () => {
      const start = new Date(Date.UTC(2024, 0, 1));
      const event = new Event();
      const eom = event.getEom(start);
      expect(eom).toEqual(new Date(Date.UTC(2024, 0, 31)))
    })

    it('should get end of month pebruary', () => {
      const start = new Date(Date.UTC(2024, 1, 1));
      const event = new Event();
      const eom = event.getEom(start);
      expect(eom).toEqual(new Date(Date.UTC(2024, 1, 29)))
    })
  })

  describe('get day in param slot', () => {
    it('should get all day in august', () => {
      const param = {
        month: new Date(Date.UTC(2024, 7))
      };
      const event = new Event();
      const day = event.getDayInSlotParam(param);
      expect(day.length).toEqual(31)
      expect(day[0]).toEqual(new Date('2024-08-01'))
      expect(day[30]).toEqual(new Date('2024-08-31'))
    })

    it('should get specific day in august', () => {
      const param = {
        month: new Date(Date.UTC(2024, 7)),
        date: new Date(Date.UTC(2024, 7, 1))
      }
      const event = new Event();
      const day = event.getDayInSlotParam(param);
      expect(day.length).toEqual(1)
      expect(day[0]).toEqual(new Date(Date.UTC(2024, 7, 1)))
    })
  })

  describe('available slot', () => {
    const schedule = new Schedule();
    const startDate = new Date(Date.UTC(2024, 7, 1));
    const endDate = new Date(startDate.setDate(30));
    schedule.dateRange = {
      start: startDate,
      end: endDate,
    }
    schedule.availableHours = [
      {
        day: DAY.MONDAY,
        hours: [
          TimeRange.create(17 * ONE_HOUR, 18 * ONE_HOUR)
        ]
      }
    ]

    const event = new Event();
    event.duration = ONE_HOUR;
    event.name = 'Test name'
    event.schedule = schedule

    it('should get 4 day', () => {
      const result = event.getAvailableSlots({month: new Date('2024-08')})
      expect(result).not.toBeInstanceOf(Error)
      expect((result as AvailableDay[]).length).toEqual(4)
      expect((result as AvailableDay[])[0].slots.length).toEqual(1)
    })

    it('should get 2 slot in specific date', () => {
      schedule.availableHours = [
        {
          day: DAY.MONDAY,
          hours: [
            TimeRange.create(9 * ONE_HOUR, 10 * ONE_HOUR),
            TimeRange.create(17 * ONE_HOUR, 18 * ONE_HOUR)
          ]
        }
      ]
      event.schedule = schedule

      const result = event.getAvailableSlots({month: new Date('2024-08'), date: new Date('2024-08-05')})
      expect(result).not.toBeInstanceOf(Error)
      expect((result as AvailableDay[]).length).toEqual(1)
      expect((result as AvailableDay[])[0].slots.length).toEqual(2)
    })
  })
})