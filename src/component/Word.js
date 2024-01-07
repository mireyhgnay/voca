import React, { useState } from "react";

export default function Word({ word }) {
  const [isShow, setIsShow] = useState(false);
  const [isDone, setIsDone] = useState(word.isDone);

  // 한글 뜻 노출 여부
  function toggleShow() {
    setIsShow(!isShow);
  }

  function toggleDone() {
    fetch(`http://localhost:3001/words/${word.id}`, {
      method: "PUT", // 수정
      headers: {
        "Content-Type": "application/json", // json형태로 보냅니다.
      },
      body: JSON.stringify({
        ...word,
        isDone: !isDone,
      }),
    }).then((res) => {
      if (res.ok) setIsDone(!isDone);
    });
  }

  return (
    <tr className={isDone ? "off" : ""}>
      <td>
        <input type="checkbox" checked={isDone} onChange={toggleDone} />
      </td>
      <td>{word.eng}</td>
      <td>{isShow && word.kor}</td>
      <td>
        <button type="button" onClick={toggleShow}>
          {isShow ? "뜻 숨기기" : "뜻 보기"}
        </button>
        <button type="button" className="btn_del">
          삭제
        </button>
      </td>
    </tr>
  );
}
