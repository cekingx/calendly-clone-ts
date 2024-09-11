export enum DAY {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THRUSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
}

export class Schedule {
  dateRange: DateRange;
  availableHours: AvailableHour[];
}

/**
 * AvailableHour store information about available hours in a day
 */
class AvailableHour {
  day: DAY;
  hours: TimeRange[];
}

class DateRange {
  start: Date;
  end: Date;
}

export class TimeRange {
  start: number;
  end: number;

  static create(start: number, end: number): TimeRange {
    const timerange = new TimeRange();
    timerange.start = start;
    timerange.end = end;
    return timerange;
  }

  getStart(): string {
    return this.translate(this.start);
  }

  getEnd(): string {
    return this.translate(this.end);
  }

  private translate(second: number): string {
    // UTC timestamp
    const time = new Date(0);
    // convert second to milisecond
    time.setTime(second * 1000);
    const hour = time.getUTCHours().toString().padStart(2, '0')
    const minute = time.getUTCMinutes().toString().padStart(2, '0')

    return `${hour}:${minute}`;
  }
}
