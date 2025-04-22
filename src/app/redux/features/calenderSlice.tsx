import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as XLSX from "xlsx";

interface CalendarItem {
  title: string;
  date: string;
}

interface CalendarState {
  events: CalendarItem[];
  reminders: CalendarItem[];
}

const initialState: CalendarState = {
  events: [],
  reminders: [],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setInitialState: (state, action: PayloadAction<CalendarState>) => {
      state.events = action.payload.events;
      state.reminders = action.payload.reminders;
    },
    addEvent: (state, action: PayloadAction<CalendarItem>) => {
      state.events.push(action.payload);
    },
    addReminder: (state, action: PayloadAction<CalendarItem>) => {
      state.reminders.push(action.payload);
    },

    // To delete event or reminder
    deleteItem: (
      state,
      action: PayloadAction<{ title: string; date: string }>
    ) => {
      state.events = state.events.filter(
        (e) =>
          e.title !== action.payload.title || e.date !== action.payload.date
      );
      state.reminders = state.reminders.filter(
        (r) =>
          r.title !== action.payload.title || r.date !== action.payload.date
      );
    },

    // Export the data in Excel sheet format
    exportData: (state) => {
      // Combine events and reminders with type indicator
      const allItems = [
        ...state.events.map((event) => ({ ...event, Type: "Event" })),
        ...state.reminders.map((reminder) => ({
          ...reminder,
          Type: "Reminder",
        })),
      ];

      // Create sheet
      const ws = XLSX.utils.json_to_sheet(allItems);

      // Create and export workbook
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Calendar Data");
      XLSX.writeFile(wb, "calendar-data.xlsx");
    },
  },
});

export const {
  setInitialState,
  addEvent,
  addReminder,
  deleteItem,
  exportData,
} = calendarSlice.actions;
export default calendarSlice.reducer;
