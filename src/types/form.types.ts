/*
    Types for form data objects (e.g., LoginForm, SignupForm).
    ex: InputChangeHandler, KeyPressHandler, SubmitHandler
*/

// :::::::::: FORM HANDLER TYPES ::::::::::

// For handling input/textarea changes
export type InputChangeHandler = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;

// For handling select dropdown changes
export type SelectChangeHandler = (
  e: React.ChangeEvent<HTMLSelectElement>
) => void;

// For handling form submission
export type SubmitHandler = (e?: React.FormEvent<HTMLFormElement>) => void;

// For key press events (e.g., Enter to submit)
export type KeyPressHandler = (
  e: React.KeyboardEvent,
  isTyping: boolean,
  handleSubmit: () => void
) => void;

// For checkbox/radio button changes
export type CheckboxChangeHandler = (
  e: React.ChangeEvent<HTMLInputElement>
) => void;

// For generic blur event handling (validation, etc.)(if any)
export type BlurHandler = (
  e: React.FocusEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
) => void;


/* ----------- Form data types ----------- */
export interface BaseFormProps extends React.ComponentProps<"form"> {
  children: React.ReactNode
}

export interface FormHeaderProps {
  title: string
  description?: string
  action?: React.ReactNode
}

export interface FormBodyProps {
  children: React.ReactNode
}

export interface FormFooterProps {
  children: React.ReactNode
}