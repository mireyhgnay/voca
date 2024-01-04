import { Link } from "react-router-dom";
import useFecth from "../hooks/useFecth";

export default function DayList() {
  const days = useFecth("http://localhost:3001/days");

  return (
    <div>
      <ul className="list_day">
        {days.map((day) => (
          <li key={day.id}>
            <Link to={`/day/${day.day}`}>Day {day.day}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
