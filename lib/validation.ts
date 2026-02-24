import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
	name: Yup.string().trim().min(3, 'Name must be at least min 3 char').required("Name is required"),
	email: Yup.string()
		.matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email format")
		.required("Email is required"),
	password: Yup.string().min(7, "Enter a valid Password*").required("Password is required"),
});

export const SignInSchema = Yup.object().shape({
	email: Yup.string()
		.matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email format")
		.required("Email is required"),
	password: Yup.string().min(7, "Enter a valid Password*").required("Password is required"),
})