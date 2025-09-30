import { useEffect, useReducer, useState } from "react";
import { examReducer, initialExamState } from "../context/examReducer";
import { getQuestions } from "../services/examService";
import { submitAnswers as submitAnswersService } from "../services/examService";

export function Exam() {
  const [exam, dispatch] = useReducer(examReducer, initialExamState);
  const [result, setResult] = useState({
    incorrectAmount: 0,
    failed: false,
    correctAmount: 0,
  });

  useEffect(() => {}, [exam.answers]);

  useEffect(() => {
    async function fetchQeustions() {
      try {
        var questions = await getQuestions(1, "ka");
        dispatch({
          type: "EXAM_START",
          payload: questions,
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchQeustions();
  }, []);

  async function submitAnswers() {
    if (Object.keys(exam.answers).length < 30) {
      alert("Must answer all 30 questions");
      return;
    }

    try {
      const res = await submitAnswersService(exam);
      setResult({
        correctAmount: res.correctAmount,
        failed: res.failed,
        incorrectAmount: res.incorrectAmount,
      });

      dispatch({
        type: "EXAM_SUBMIT",
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {exam.started ? (
        exam.submitted ? (
          <div>
            <h1>Exam Submitted</h1>
            <ul>
              {result.failed ? <li>you failed</li> : <li>you passed</li>}
              <li>incorrectAmount: {result.incorrectAmount}</li>
              <li>correctAmount: {result.correctAmount}</li>
            </ul>
          </div>
        ) : (
          <>
            <h1>EXAM</h1>
            <div>
              <h2>{exam.questions[exam.currentIndex].questionContent}</h2>
              <ul>
                <p>question {exam.currentIndex + 1}</p>
                {exam.questions[exam.currentIndex].answers.map((a) => (
                  <li key={a.id}>
                    <button
                      onClick={() => {
                        dispatch({
                          type: "EXAM_ANSWER",
                          payload: {
                            questionId: exam.questions[exam.currentIndex].id,
                            answerId: a.id,
                          },
                        });
                      }}
                      style={{
                        backgroundColor:
                          a.id ===
                          exam.answers[exam.questions[exam.currentIndex].id]
                            ? "#4CAF50"
                            : "#f0f0f0",
                      }}
                    >
                      {a.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => dispatch({ type: "EXAM_PREV" })}
              disabled={exam.currentIndex === 0}
            >
              Prev
            </button>
            {exam.currentIndex + 1 === 30 ? (
              <button onClick={submitAnswers}>Submit</button>
            ) : (
              <button onClick={() => dispatch({ type: "EXAM_NEXT" })}>
                Next
              </button>
            )}
          </>
        )
      ) : (
        <p>Loading exam...</p>
      )}
    </>
  );
}
