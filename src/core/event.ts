import { Schedule } from "./schedule";
import { dayOfDate, onlyDate } from "./utils";

const ONE_DAY = 24 * 60 * 60 * 1000;

class SlotParams {
  month: Date;
  date?: Date;
}

class Slot {
  start: Date;
  duration: number;

  getEnd(): Date {
    return new Date(this.start.getTime() + this.duration);
  }
}

export class AvailableDay {
  date: Date;
  slots: Slot[];
}

export class Event {
  name: string;
  duration: number;
  schedule: Schedule;

  getAvailableSlots(param: SlotParams): AvailableDay[] | Error {
    const result = []
    const dayInSlotParam = this.getDayInSlotParam(param);

    for (const day of dayInSlotParam) {
      for (const availability of this.schedule.availableHours) {
        if (availability.day == dayOfDate(day)) {
          const available: AvailableDay = {
            date: new Date(day),
            slots: []
          }

          for(const hour of availability.hours) {
            const slot = new Slot()
            slot.start = new Date(day.getTime() + hour.start)
            slot.duration = this.duration
            available.slots.push(slot)
          }

          result.push(available)
        }
      }
    }

    return result;
  }

  getDayInSlotParam(params: SlotParams): Date[] {
    const date = new Date(params.month);
    const eom = this.getEom(new Date(date));

    const result: Date[] = []
    if(params.date) {
      const temp = new Date(params.date);
      result.push(temp);
      return result;
    }

    while(date <= eom) {
      result.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return result;
  }

  getEom(date: Date): Date {
    const year = Number(date.getUTCFullYear());
    const month = Number(date.getUTCMonth());
    const nextMonth = new Date(Date.UTC(year, month + 1));
    const beforeNextMonth = new Date(nextMonth.getTime() - 1000);
    const eom = onlyDate(beforeNextMonth)
    return eom;
  }
}