import { Schedule } from "./schedule";

const ONE_DAY = 24 * 60 * 60 * 1000;

class SlotParams {
  month: Date;
  date?: Date;
}

class Slot {
  start: Date;
  end: Date;
}

class AvailableDay {
  slots: Slot[];
}

export class Event {
  name: string;
  duration: number;
  schedule: Schedule;

  getAvailableSlots(param: SlotParams): AvailableDay[] | Error {
    return new Error('Not implemented');
  }

  getDayInSlotParam(params: SlotParams): number[] {
    let date = new Date(params.month);
    let eom = this.getEom(date);
    let isSpecificDate = false;
    if (params.date) {
      date = params.date;
      isSpecificDate = true;
    }

    const result: number[] = []
    if(isSpecificDate) {
      result.push(date.getDay());
      return result;
    }

    while(date < eom) {
      result.push(date.getDay());
      date.setDate(date.getDate() + 1);
    }
    return result;
  }

  getEom(date: Date): Date {
    const startMonth = Number(date.getMonth());
    const startYear = Number(date.getFullYear());
    const start = new Date(Date.UTC(startYear, startMonth));
    const nextMonth = new Date(start);
    nextMonth.setMonth(start.getMonth() + 1)
    const eom = new Date(nextMonth.getTime() - ONE_DAY);
    return eom;
  }
}