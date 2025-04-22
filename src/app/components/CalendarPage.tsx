"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  addEvent,
  addReminder,
  deleteItem,
  exportData,
} from "../redux/features/calenderSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const DatePage = () => {
  const dispatch = useAppDispatch();
  const { events, reminders } = useAppSelector((state) => state.calendar);

  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"event" | "reminder">("event");

  // Display the dialog after clicking on date box
  const handleDateClick = (arg: DateClickArg) => {
    setSelectedDate(arg.dateStr);
    setOpen(true);
  };

  // Delete the events & reminders
  const handleDelete = (arg: EventClickArg) => {
    const { title, startStr } = arg.event;
    dispatch(deleteItem({ title, date: startStr }));
  };

  // Handle the save button click
  const handleSave = () => {
    if (!title || !selectedDate) return;
    if (type === "event") {
      dispatch(addEvent({ title, date: selectedDate }));
    } else {
      dispatch(addReminder({ title, date: selectedDate }));
    }
    setOpen(false);
    setTitle("");
    setType("event");
  };

  // Display all the events
  const allEvents = [
    ...events.map((event) => ({
      title: event.title,
      date: event.date,
      color: "#4f46e5",
    })),
    ...reminders.map((reminder) => ({
      title: reminder.title,
      date: reminder.date,
      color: "#f59e0b",
    })),
  ];

  return (
    <div className="w-full p-4">
      <div className="flex justify-end mb-4">
        <Button
          className="cursor-pointer"
          variant="outline"
          onClick={() => dispatch(exportData())}
        >
          Export Data
        </Button>
      </div>
      <div className="flex flex-col">
        <p className="text-xs text-gray-400 ">
          * Click on any date box to add the events and reminders.
        </p>
        <p className="text-xs text-gray-400 ">
          * Click on event or reminder to delete.
        </p>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        eventClick={handleDelete}
        events={allEvents}
        height="auto"
        eventDidMount={(info) => {
          info.el.style.cursor = "pointer";
        }}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Add {type === "event" ? "Event" : "Reminder"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="flex gap-4">
              <Button
                variant={type === "event" ? "default" : "outline"}
                onClick={() => setType("event")}
              >
                Event
              </Button>
              <Button
                variant={type === "reminder" ? "default" : "outline"}
                onClick={() => setType("reminder")}
              >
                Reminder
              </Button>
            </div>
            <Button onClick={handleSave} className="w-full cursor-pointer">
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DatePage;
