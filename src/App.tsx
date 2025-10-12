import { useState } from "react";
import "./css/App.css";

function App() {
  const [category, setCategory] = useState("2");
  const [language, setLanguage] = useState("en");

  const examUrl = `/exam?lang=${language}&category=${category}`;

  return (
    <>
      <h1>PROJECT CURRENTLY UNDER CONSTRUCTION</h1>
      <a href="/documentation">please visit the documentation first</a>
      <br />
      <br />
      <br />
      <label htmlFor="category">Category: </label>
      <select
        name="category"
        id=""
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="1">A, A1</option>
        <option value="10">AM</option>
        <option value="2">B, B1</option>
        <option value="3">C</option>
        <option value="4">C1</option>
        <option value="5">D</option>
        <option value="6">D1</option>
        <option value="7">T, S</option>
        <option value="8">Tram</option>
        <option value="9">B+C1 Mil</option>
      </select>

      <br />
      <br />

      <label htmlFor="language">Language: </label>
      <select
        name="langauge"
        id=""
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="ka">Georgian</option>
      </select>
      <br />
      <br />
      <a href={examUrl}>Start exam</a>
    </>
  );
}

export default App;
