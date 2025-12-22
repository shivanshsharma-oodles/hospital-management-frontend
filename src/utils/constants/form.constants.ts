
/* --------------- LOGIN / SIGNUP FORM --------------- */

export const ADMINLOGINFORM = {
  TITLE: "Welcome back",
  DESCRIPTION: "Login to your admin account",
  SUBMIT_BUTTON_TEXT: "Login as admin",
} as const;

export const SIGNUPFORM = {
  TITLE: "Create an Account",
  DESCRIPTION: "Sign up to access all features",
  SUBMIT_BUTTON_TEXT: "Sign Up",
  FOOTER_TEXT: "Already have an account? ",
  FOOTER_LINK_TEXT: "Log in",
  FOOTER_LINK_HREF: "/",
}

export const LOGINFORM = {
  TITLE: "Welcome back",
  DESCRIPTION: "Login to your account",
  SUBMIT_BUTTON_TEXT: "Login",
  FOOTER_TEXT: "New to our platform? ",
  FOOTER_LINK_TEXT: "Sign up",
  FOOTER_LINK_HREF: "/signup",
} as const;

/* --------------- Department Form --------------- */

export const ADD_DEPARTMENT_FORM = {
  TITLE: "Add New Department",
  DESCRIPTION: "Fill in the details to create a new department",

  BUTTONS: {
    SUBMIT: "Add Department",
    CANCEL: "Cancel",
  },

  FIELDS: {
    NAME: {
      id: "name",
      label: "Department Name",
      placeholder: "e.g., Cardiology",
      required: true,
    },
    DESCRIPTION: {
      id: "description",
      label: "Description",
      placeholder: "Brief description of the department",
      required: true,
    },
  },
} as const;

// Slots Form
export const Add_Doctor_Slot_Form = {
   TITLE: "Add Available Slots",
  DESCRIPTION: "Add the slots you will be availbale in to get booked for an appointment",

  BUTTONS: {
    SUBMIT: "Add Slot",
    CANCEL: "Cancel",
  },

  FIELDS: {
    DATE: {
      id: "date",
      label: "Date",
      placeholder: "date",
      type: "date",
      required: true,
    },
    START_TIME: {
      id: "startTime",
      label: "Start Time",
      placeholder: "Start time",
      type: "time",
      required: true,
    },
    END_TIME: {
      id: "endTime",
      label: "End Time",
      placeholder: "End time",
      type: "time",
      required: true,
    },
  },
}


/* --------------- Doctor Form --------------- */
export const ADD_DOCTOR_FORM = {
  TITLE: "Add New Doctor",
  DESCRIPTION: "Add a new doctor by providing their professional and contact details. This information will be used for appointments, department mapping, and patient interactions.",
  
  BUTTONS: {
    SUBMIT: "Add Doctor",
    CANCEL: "Cancel",
    GO_BACK: "Go Back",
    SUBMITTING: "Adding Doctor...",
  },

  SECTIONS: {
    PERSONAL: "Personal Information",
    ADDRESS: "Address Details",
    DEPARTMENT: "Department Assignment",
  },

  FIELDS: {
    NAME: {
      id: "name",
      label: "Doctor Name",
      placeholder: "Doctor Name",
      required: true,
    },
    EMAIL: {
      id: "email",
      label: "Doctor Email",
      placeholder: "Doctor Email",
      required: true,
    },
    PHONE: {
      id: "phone",
      label: "Phone Number",
      placeholder: "Phone Number",
      required: true,
    },
    PASSWORD: {
      id: "password",
      label: "Password",
      placeholder: "Password",
      required: true,
    },
    DOB: {
      id: "dob",
      label: "Date Of Birth",
      placeholder: "Date Of Birth",
      required: true,
    },
    GENDER: {
      id: "gender",
      label: "Gender",
      placeholder: "Select gender",
      required: true,
    },
    DEPARTMENT: {
      id: "departmentId",
      label: "Department",
      placeholder: "Select department",
      required: true,
    },
  },

  ADDRESS_FIELDS: {
    STREET: {
      id: "address.street",
      label: "Street Name",
      placeholder: "Street Name",
      required: false,
    },
    CITY: {
      id: "address.city",
      label: "City Name",
      placeholder: "City Name",
      required: false,
    },
    STATE: {
      id: "address.state",
      label: "State Name",
      placeholder: "State Name",
      required: false,
    },
    ZIP: {
      id: "address.zip",
      label: "Zip Code",
      placeholder: "Zip Code",
      required: false,
    },
  },
} as const;

// Shared constants
export const GENDER_OPTIONS = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "OTHER", label: "Other" },
] as const;

export const FORM_VALIDATION = {
  PHONE: {
    MIN: 8,
    MAX: 15,
  },
} as const;

export const COMMON_BUTTONS = {
  SUBMIT: "Submit",
  CANCEL: "Cancel",
  GO_BACK: "Go Back",
  SUBMITTING: "Submitting...",
} as const;