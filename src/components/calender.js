import React, { useState, useEffect } from "react";
import {
  addWeeks,
  subWeeks,
  format,
  startOfWeek,
  endOfWeek,
  addDays,
} from "date-fns";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timezone, setTimezone] = useState("UTC+0");
  const [jsonData, setJsonData] = useState([]);
  const [displayedWeek, setDisplayedWeek] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setJsonData(data))
      .catch((error) => console.error("Error loading JSON data", error));
  }, []);

  useEffect(() => {
    updateDisplayedWeek();
  }, [selectedDate, timezone, jsonData]);

  const handleWeekChange = (direction) => {
    const newDate =
      direction === "prev"
        ? subWeeks(selectedDate, 1)
        : addWeeks(selectedDate, 1);
    setSelectedDate(newDate);
  };

  const handleTimezoneChange = (event) => {
    setTimezone(event.target.value);
  };

  const updateDisplayedWeek = () => {
    const start = startOfWeek(selectedDate);
    const end = endOfWeek(selectedDate);
    const week = [];
    for (
      let currentDate = start;
      currentDate <= end;
      currentDate = addDays(currentDate, 1)
    ) {
      const date = format(currentDate, "yyyy-MM-dd");
      const dayData = jsonData.filter((item) => item.Date === date);
      week.push({
        date,
        day: format(currentDate, "EEE"),
        data: dayData.length > 0 ? dayData[0] : null,
      });
    }
    setDisplayedWeek(week);
  };

  const renderWeekDays = () => {
    return (
      <div>
        {displayedWeek.map((day) => (
          <div key={day.date} className="day">
            <span>{day.day}</span>
            <div className="time">
              {jsonData.map((item) => (
                <div key={item.Id} className="checkbox-label">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "1rem",
                    }}
                  >
                    <input type="checkbox" />
                    <p> {item.Time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={() => handleWeekChange("prev")}>Previous Week</button>
        <span>{format(selectedDate, "MMMM d, yyyy")}</span>
        <button onClick={() => handleWeekChange("next")}>Next Week</button>
      </div>
      <div className="timezone-select">
        <label>Select Timezone: </label>
        <select onChange={handleTimezoneChange} value={timezone}>
          <option value="UTC+0">UTC+0</option>
          <option value="UTC+2">UTC+2</option>
        </select>
      </div>
      <div className="week-days">{renderWeekDays()}</div>
    </div>
  );
};

export default Calendar;
