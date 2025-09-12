export type Question = {
  id: number;
  image: string | null;
  questionContent: string;
  answers: Answer[];
};

type Answer = {
  id: number;
  text: string;
};

export type ExamState = {
  questions: Question[];
  currentIndex: number;
  answers: Record<number, number>;
  started: boolean;
  submitted: boolean;
};

export type ExamAction =
  | { type: "EXAM_START"; payload: Question[] }
  | { type: "EXAM_ANSWER"; payload: { questionId: number; answerId: number } }
  | { type: "EXAM_NEXT" }
  | { type: "EXAM_PREV" }
  | { type: "EXAM_SUBMIT" };

export const initialExamState: ExamState = {
  questions: [],
  currentIndex: 0,
  answers: {},
  started: false,
  submitted: false,
};

export function examReducer(state: ExamState, action: ExamAction): ExamState {
  switch (action.type) {
    case "EXAM_START":
      return {
        ...state,
        questions: action.payload,
        currentIndex: 0,
        answers: {},
        started: true,
        submitted: false,
      };
    case "EXAM_ANSWER":
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload.answerId,
        },
      };
    case "EXAM_NEXT":
      return {
        ...state,
        currentIndex: Math.min(
          state.currentIndex + 1,
          state.questions.length - 1
        ),
      };
    case "EXAM_PREV":
      return {
        ...state,
        currentIndex: Math.max(state.currentIndex - 1, 0),
      };
    case "EXAM_SUBMIT":
      return {
        ...state,
        submitted: true,
      };
    default:
      return state;
  }
}
