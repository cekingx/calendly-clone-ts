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
    const ONE_HOUR = 60 + 60;
    const ONE_MINUTE = 60;
    const hour = Math.floor(second / ONE_HOUR);
    const hourString = hour.toString().padStart(2, '0');
    const minute = Math.floor((second % ONE_HOUR) / ONE_MINUTE);
    const minuteString = minute.toString().padStart(2, '0');

    return `${hourString}:${minuteString}`;
  }
}
