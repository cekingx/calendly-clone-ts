import { Schedule } from "./core/schedule";

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
}