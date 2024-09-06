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

class TimeRange {
  start: number;
  end: number;

  getStart(): string {
    return this.translate(this.start);
  }

  getEnd(): string {
    return this.translate(this.end);
  }

  private translate(second: number): string {
    return '09:00';
  }
}
