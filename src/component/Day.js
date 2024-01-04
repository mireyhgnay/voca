import { useParams } from "react-router-dom";
import Word from "./Word";
import useFecth from "../hooks/useFecth";

export default function Day() {
  const day = useParams().day; // type of String
  // const { day } = useParams();

  const words = useFecth(`http://localhost:3001/words?day=${day}`);

  return (
    <>
      <h2>Day {day}</h2>
      <table>
        <tbody>
          {words.map((word) => (
            <Word word={word} key={word.id} />
          ))}
        </tbody>
      </table>
    </>
  );
}
