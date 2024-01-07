import React, { useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

export default function CreateWord() {
  const days = useFetch("http://localhost:3001/days");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();

    if (!isLoading && dayRef.current && engRef.current && korRef.current) {
      setIsLoading(true);

      const day = dayRef.current.value;
      const eng = engRef.current.value;
      const kor = korRef.current.value;

      fetch(`http://localhost:3001/words`, {
        method: "POST", // 수정
        headers: {
          "Content-Type": "application/json", // json형태로 보냅니다.
        },
        body: JSON.stringify({
          day,
          eng,
          kor,
          isDone: false, // 초기값은 false 상태
        }),
      }).then((res) => {
        if (res.ok) {
          alert("생성이 완료 되었습니다");
          navigate(`/day/${day}`);
          setIsLoading(false);
        }
      });
    }
  }
  const engRef = useRef(null);
  const korRef = useRef(null);
  const dayRef = useRef(null);

  return (
    <form onSubmit={onSubmit}>
      <div className="input_area">
        <label>Eng</label>
        <input type="text" placeholder="computer" ref={engRef} />
      </div>
      <div className="input_area">
        <label>Kor</label>
        <input type="text" placeholder="컴퓨터" ref={korRef} />
      </div>
      <div className="input_area">
        <label>Day</label>
        <select ref={dayRef}>
          {days.map((day) => (
            <option key={day.id} value={day.day}>
              {day.day}
            </option>
          ))}
        </select>
      </div>
      <button
        style={{
          opacity: isLoading ? 0.3 : 1,
        }}
      >
        {isLoading ? "Saving..." : "저장"}
      </button>
    </form>
  );
}
