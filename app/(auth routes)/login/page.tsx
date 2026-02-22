"use client";

import {useState} from "react";
import {signIn} from "@/app/lib/api";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {SignInSchema} from "@/app/lib/validation";
import Link from "next/link";
import clsx from "clsx";

import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline";

const LoginPage = () => {
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	async function handleSubmit(
		values: { email: string; password: string },
		{ setSubmitting, setFieldError }: any
	) {
		setError(null);
		setLoading(true);
		const trimmedValues = {
			email: values.email.trim(),
			password: values.password.trim(),
		}

		try {
			const result = await signIn(trimmedValues);
			if (result?.error) {
				setFieldError('general', result.error);
			}
		} catch (e) {
			setFieldError('general', 'Something went wrong. Please try again!');
		} finally {
			setSubmitting(false);
			setLoading(false);
		}
	}

	return (
		<main>
			<Formik initialValues={{ email: '', password: '' }} validationSchema={SignInSchema}
					onSubmit={handleSubmit}>
				{( { errors, touched, isSubmitting } ) => (
					<Form>
						<div className='flex flex-col gap-2.5 mb-37'>
							<div className='flex flex-col gap-2.5'>
								<div
									className="w-full bg-input-bg rounded-xl flex items-center gap-2.5 p-3.5 border border-transparent focus-within:border-light-gr">
									<label className='text-[12px] text-gray-text' htmlFor="email">Email:</label>
									<Field className='bg-transparent outline-0' id="email" name="email" type="email"
										   required/>
								</div>
								<ErrorMessage name="email" component="div" className='text-red-700 leading-none'/>
							</div>

							<div className='flex flex-col gap-2.5'>
								<div
									className={clsx(
										"w-full bg-input-bg rounded-xl flex items-center gap-2.5 p-3.5 border",
										touched.password && errors.password && 'border-red-700',
										touched.password && !errors.password && 'border-green-500'
									)}>
									<label className='text-[12px] text-gray-text' htmlFor="password">Password:</label>
									<Field className='bg-transparent outline-0' id="password" name="password"
										   type={showPassword ? "text" : "password"}
										   required/>
									<button onClick={() => setShowPassword(!showPassword)}>
										{showPassword ? <EyeIcon className='size-6 text-taupe-200'/> :
											<EyeSlashIcon className='size-6 text-taupe-200'/>}
									</button>
								</div>
								<ErrorMessage name="password" component="div" className='text-red-700 leading-none'/>
							</div>
						</div>


						<div className='flex items-center gap-2.5'>
							<button
								className='bg-primary text-secondary-bg text-[14px] font-bold px-7 py-3 rounded-4xl lg:hover:border-light-gr lg:hover:bg-background lg:hover:text-primary lg:cursor-pointer'
								type="submit"
								disabled={loading}>
								{loading ? "Loading..." : "Login"}
							</button>

							<Link href='/register' className='underline text-gray-text text-sm lg:hover:text-primary'>Don’t
								have an account? </Link>
						</div>
					</Form>
				)}
			</Formik>
		</main>
	);
};

export default LoginPage;