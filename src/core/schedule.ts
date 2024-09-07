export class Schedule {
  dateRange: DateRange;
  availableHours: AvailableHour[];
}

/**
 * AvailableHour store information about available hours in a day
 */
class AvailableHour {
  day: Date;
  hours: TimeRange[];
}

class DateRange {
  start: Date;
  end: Date;
}

export class TimeRange {
  start: number;
  end: number;

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
