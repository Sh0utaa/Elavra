export type RegistrationState = {
  step: "form" | "verification" | "complete";
  formData: {
    userName: string;
    dateOfBirth: string;
    email: string;
    password: string;
  };
  verification: {
    code: string;
    isVerified: boolean;
    isSending: boolean;
    error: string | null;
  };
  isLoading: boolean;
  error: string | null;
};

export type RegistrationAction =
  | {
      type: "UPDATE_FORM_DATA";
      payload: {
        field: keyof RegistrationState["formData"];
        value: string;
      };
    }
  | { type: "SEND_VERIFICATION_CODE_START" }
  | { type: "SEND_VERIFICATION_CODE_SUCCESS" }
  | { type: "SEND_VERIFICATION_CODE_ERROR"; payload: string }
  | { type: "VERIFY_CODE_START" }
  | { type: "VERIFY_CODE_SUCCESS" }
  | { type: "VERIFY_CODE_ERROR"; payload: string }
  | { type: "REGISTER_START" }
  | { type: "REGISTER_SUCCESS" }
  | { type: "REGISTER_ERROR"; payload: string }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" };

export const initialRegistrationState: RegistrationState = {
  step: "form",
  formData: {
    userName: "",
    dateOfBirth: "",
    email: "",
    password: "",
  },
  verification: {
    code: "",
    isVerified: false,
    isSending: false,
    error: null,
  },
  isLoading: false,
  error: null,
};

export function registrationReducer(
  state: RegistrationState,
  action: RegistrationAction
): RegistrationState {
  switch (action.type) {
    case "UPDATE_FORM_DATA":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.field]: action.payload.value,
        },
      };

    case "SEND_VERIFICATION_CODE_START":
      return {
        ...state,
        verification: { ...state.verification, isSending: true, error: null },
      };

    case "SEND_VERIFICATION_CODE_SUCCESS":
      return {
        ...state,
        step: "verification",
        verification: { ...state.verification, isSending: false, error: null },
      };

    case "SEND_VERIFICATION_CODE_ERROR":
      return {
        ...state,
        verification: {
          ...state.verification,
          isSending: false,
          error: action.payload,
        },
      };

    case "VERIFY_CODE_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case "VERIFY_CODE_SUCCESS":
      return {
        ...state,
        verification: { ...state.verification, isVerified: true },
        isLoading: false,
      };

    case "VERIFY_CODE_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case "REGISTER_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case "REGISTER_SUCCESS":
      return {
        ...state,
        step: "complete",
        isLoading: false,
      };

    case "REGISTER_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case "NEXT_STEP":
      return { ...state, step: getNextStep(state.step) };

    case "PREV_STEP":
      return { ...state, step: getPrevStep(state.step) };

    default:
      return state;
  }
}

function getNextStep(
  currentStep: RegistrationState["step"]
): RegistrationState["step"] {
  switch (currentStep) {
    case "form":
      return "verification";
    case "verification":
      return "complete";
    default:
      return currentStep;
  }
}

function getPrevStep(
  currentStep: RegistrationState["step"]
): RegistrationState["step"] {
  switch (currentStep) {
    case "verification":
      return "form";
    case "complete":
      return "verification";
    default:
      return currentStep;
  }
}
