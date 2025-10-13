import { useState, type JSX } from "react";
import classes from "../css/documentation.module.css";
import { Introduction } from "../components/docs/Introduction";
import { DesignSystem } from "../components/docs/DesignSystem";
import { APIDesignSystem } from "../components/docs/APIDesignSystem";

export default function Documentation() {
  type DocTopic = "Introduction" | "Design System" | "API Design System";

  const topics: DocTopic[] = [
    "Introduction",
    "Design System",
    "API Design System",
  ];
  const [topic, setTopic] = useState<DocTopic>("API Design System");

  const topicComponents: Record<DocTopic, JSX.Element> = {
    Introduction: <Introduction />,
    "Design System": <DesignSystem />,
    "API Design System": <APIDesignSystem />,
  };

  return (
    <div className={classes.documentationContainer}>
      <div className={classes.listOfContents}>
        <ul>
          {topics.map((t) => (
            <li
              key={t}
              onClick={() => setTopic(t)}
              className={topic === t ? classes.active : ""}
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className={classes.content}>{topicComponents[topic]}</div>
    </div>
  );
}
