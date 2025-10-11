import type { ExamState } from "../reducers/examReducer";

const api = import.meta.env.VITE_BACKEND_API;

export async function getQuestions(category: number, language: string) {
  const res = await fetch(
    `${api}/questions/exam/${category}?language=${language}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "failed to fetch questions");
  }

  return res.json();
}

export async function submitAnswers(state: ExamState) {
  const requestBody = Object.entries(state.answers).map(
    ([questionIdStr, answerId]) => ({
      questionId: parseInt(questionIdStr),
      answerId: answerId,
    })
  );

  const res = await fetch(`${api}/questions/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(requestBody), // This will be the array format
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to submit answers");
  }

  return res.json();
}
