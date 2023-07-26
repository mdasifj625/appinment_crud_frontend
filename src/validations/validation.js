import * as Yup from "yup";

export const validation = Yup.object({
    patientName: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, "Patient name should be alphabets only")
        .required("This field is required"),
    phoneNumber: Yup.string()
        .matches(/^[6789]\d{9}$/, "Please enter a valid phone number")
        .required("This field is required"),
    gender: Yup.string()
        .matches(/(male|female)/, "gender should be valid")
        .required("This field is required"),
    status: Yup.string()
        .matches(/(consult|revisit)/, "status should be valid")
        .required("This field is required"),
    patientAge: Yup.string()
        .matches(/^([1-9]|[1-9]\d|100)$/, "Age should be between 1 to 100")
        .required("This field is required"),
    doctorName: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, "Doctor name should be alphabets only")
        .required("This field is required"),
    appointmentTime: Yup.string()
        .matches(/^([01]?\d|2[0-3]):[0-5]\d$/, "Time should be in valid format")
        .required("This field is required"),
    appointmentDate: Yup.date().required("This field is required"),
});
