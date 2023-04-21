import axios from "axios";
import React from "react";
import { RxCross2 } from "react-icons/rx";

const timeSlots = [
  "9:30 - 10:30",
  "10:30 - 11:30",
  "11:30 - 12:30",
  "12:30 - 1:30",
  "2:30 - 3:30",
  "3:30 - 4:30",
  "4:30 - 5:30",
];

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const backgrounds = [
  "bg-gradient-to-r from-indigo-400 to-cyan-400",
  "bg-gradient-to-r from-violet-500 to-purple-500",
  "bg-gradient-to-r from-neutral-300 to-stone-400",
  "bg-gradient-to-r from-amber-200 to-yellow-400",
  "bg-gradient-to-r from-rose-400 to-red-500",
  "bg-gradient-to-r from-neutral-300 to-stone-400",
];

const randInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getLecture = (data, day, time) => {
  const lecture = data.find(
    (item) => item.meeting_time.day === day && item.meeting_time.time === time
  );

  return lecture ? (
    // gradient background
    <div
      className={`flex flex-col gap-1 p-1 rounded-md w-full mx-2 ${
        backgrounds[randInt(0, 5)]
      } `}
    >
      <div className="flex justify-center">
        <div className="text-xs">
          {lecture.course.course_name} (R-{lecture.room.r_number})
        </div>
      </div>
      <div className="text-xs">{lecture.instructor.name}</div>
    </div>
  ) : (
    <div></div>
  );
};

const getSlot = (data, day, time, setData) => {
  const slot = data
    ? data.find((item) => item.day === day && item.time === time)
    : null;
  console.log(day, time);

  return (
    <div className="w-full m-4 relative rounded-md bg-slate-200 hover:bg-slate-300 group">
      {slot?.pid}
    </div>
  );
};

const Timetable = ({ data, slots, header, setData }) => {
  return (
    <div className="flex flex-col gap-4 my-10    ">
      <div className="px-2 font-extrabold  text-xl ">{header}</div>
      <div className="flex flex-row gap-2 divide-stone-300 divide-x-2   ">
        <div className="grid grid-cols-1 divide-stone-300 divide-y-[3px] w-16">
          <div className="border-b-[3px] border-b-stone-300 h-[2rem]"></div>
          {timeSlots.map((time) => (
            <div className="h-16 flex justify-between items-center py-1    flex-col">
              {time
                .split(" - ")
                .map((t, index) =>
                  index === 0 ? (
                    <span className="text-xs">{t}</span>
                  ) : (
                    <span className="text-xs opacity-0">{t}</span>
                  )
                )}
            </div>
          ))}
        </div>
        <div className="w-full px-1 grid grid-cols-1  divide-stone-300 divide-y-2">
          <div className="flex w-full justify-center border-b-[5px] border-b-stone-300 h-[2.1rem]">
            {["MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
              <span className="w-[calc(100%/6)] text-center">{day}</span>
            ))}
          </div>
          {timeSlots.map((time, timeIndex) => (
            <div className="flex w-full justify-center h-16">
              {["MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
                (day, dayIndex) => (
                  <span className="w-[calc(100%/6)] text-center border flex justify-center items-center">
                    {slots
                      ? getSlot(
                          data,
                          days[dayIndex],
                          timeSlots[timeIndex],
                          setData
                        )
                      : getLecture(data, days[dayIndex], timeSlots[timeIndex])}
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timetable;
