// scheduleData — FE-11. Flat, typed event list consumed by ScheduleGrid (FE-10).
// Adding an event here requires no changes to ScheduleGrid.tsx itself.
export type ScheduleEvent = {
  day: 1 | 2 | 3;
  time: string;
  title: string;
  now?: boolean;
};

export const SCHEDULE_EVENTS: ScheduleEvent[] = [
  { day: 1, time: "Day 1", title: "Opening" },
  { day: 1, time: "10:00 am", title: "Breakfast" },
  { day: 1, time: "11:00 am", title: "Orientation" },
  { day: 1, time: "12:00 pm", title: "Hacking starts" },
  { day: 1, time: "1:00 pm", title: "Workshops" },

  { day: 2, time: "Day 2", title: "Wake up" },
  { day: 2, time: "10:00 am", title: "Breakfast" },
  { day: 2, time: "11:00 am", title: "Mentoring", now: true },
  { day: 2, time: "12:00 pm", title: "Mini-event" },
  { day: 2, time: "1:00 pm", title: "Demos" },

  { day: 3, time: "Day 3", title: "Wake up" },
  { day: 3, time: "10:00 am", title: "Breakfast" },
  { day: 3, time: "11:00 am", title: "Judging" },
  { day: 3, time: "12:00 pm", title: "Closing" },
  { day: 3, time: "1:00 pm", title: "Awards" },
];
