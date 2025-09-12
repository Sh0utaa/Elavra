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
