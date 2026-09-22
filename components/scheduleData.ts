// scheduleData — FE-11. Flat, typed event list consumed by ScheduleGrid (FE-10).
// Adding an event here requires no changes to ScheduleGrid.tsx itself.
//
// Sourced from "2026 BostonHacks Run of Show.xlsx" (sheet "2026 Run of Show
// Draft (MLH)"), filtered to what a hacker actually needs to know — dropped
// everything staff/logistics-only (storage/AV/sound setup, volunteer arrival
// and shift handoffs, swag setup, judge briefings, cleanup, etc.) and the
// standing Q&A Desk / Discord Moderator help-desk rows (not scheduled events,
// just staffed the whole time). Two real days (Sat Nov 21 → Sun Nov 22), not
// three — the event doesn't run a third day. Where two activities run in
// parallel at the same time, both are listed as separate rows sharing that
// time. No row is marked `now` — that was always a hardcoded demo value on
// arbitrary placeholder data; with a real schedule + real Countdown target
// date, a fixed row claiming to be "now" regardless of actual time would be
// actively misleading rather than harmless placeholder flavor. `now` is still
// supported by ScheduleRow if a genuine live current-session indicator is
// wanted later (comparing real time against these rows), just not set here.
export type ScheduleEvent = {
  day: 1 | 2;
  time: string;
  title: string;
  now?: boolean;
};

export const SCHEDULE_EVENTS: ScheduleEvent[] = [
  // Day 1 — Saturday, November 21
  { day: 1, time: "9:00 am", title: "Check-In" },
  { day: 1, time: "10:00 am", title: "Opening Ceremony" },
  { day: 1, time: "10:30 am", title: "Hacking Begins" },
  { day: 1, time: "10:30 am", title: "Find Your Dream Team" },
  { day: 1, time: "11:00 am", title: "Hackathon 101" },
  { day: 1, time: "11:00 am", title: "Let's Connect & Make Friends" },
  { day: 1, time: "11:30 am", title: "Intro to Claude Code" },
  { day: 1, time: "11:30 am", title: "Switching Majors (Tech or Not)" },
  { day: 1, time: "12:00 pm", title: "Lunch" },
  { day: 1, time: "1:00 pm", title: "Figma Mockup Workshop" },
  { day: 1, time: "1:00 pm", title: "Sponsor Workshop" },
  { day: 1, time: "2:00 pm", title: "Leetcode / Competitive Programming" },
  { day: 1, time: "2:00 pm", title: "Professional Panel" },
  { day: 1, time: "3:00 pm", title: "Screentime: Off" },
  { day: 1, time: "3:00 pm", title: "Startup Pitch Competition" },
  { day: 1, time: "4:00 pm", title: "Internship Experience Panel" },
  { day: 1, time: "4:00 pm", title: "Chrome Extension Workshop" },
  { day: 1, time: "5:00 pm", title: "Mock Interviews: Spicy Edition" },
  { day: 1, time: "5:00 pm", title: "Songs: AI or Real" },
  { day: 1, time: "6:30 pm", title: "Dinner" },
  { day: 1, time: "8:00 pm", title: "MS Paint Bob Ross" },
  { day: 1, time: "8:00 pm", title: "Game Break!" },
  { day: 1, time: "9:30 pm", title: "Movie Night" },
  { day: 1, time: "10:00 pm", title: "Sleeping Spaces Open" },
  { day: 1, time: "12:00 am", title: "Midnight Snack" },

  // Day 2 — Sunday, November 22
  { day: 2, time: "7:30 am", title: "Breakfast" },
  { day: 2, time: "8:00 am", title: "1 Hour Until Submissions" },
  { day: 2, time: "9:00 am", title: "Submissions Due, Judging Begins" },
  { day: 2, time: "11:00 am", title: "Closing Ceremony" },
  { day: 2, time: "12:00 pm", title: "Event Ends" },
];
