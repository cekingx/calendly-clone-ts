import { TimeRange } from '../src/core/schedule'

describe('Schedule', () => {
  it("should show 01:00 until 02:00", () => {
    const timeRange = new TimeRange()
    timeRange.start = 60 * 60
    timeRange.end = 2 * 60 * 60

    expect(timeRange.getStart()).toEqual('01:00')
    expect(timeRange.getEnd()).toEqual('02:00')
  })

  it("should show 18:05 until 19:59", () => {
    const timeRange = new TimeRange()
    timeRange.start = 18 * 60 * 60 + (5 * 60)
    timeRange.end = 19 * 60 * 60 + (59 * 60)

    expect(timeRange.getStart()).toEqual('18:05')
    expect(timeRange.getEnd()).toEqual('19:59')
  } )
})