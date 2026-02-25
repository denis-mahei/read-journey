'use client';

import {useForm} from "react-hook-form";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {signIn, SignInRequest} from "@/lib/api/clientApi";
import {useAuthStore} from "@/lib/store/authStore";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline";
import {useState} from "react";

const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();
	const { register, handleSubmit, formState: { errors } } = useForm<SignInRequest>();

	const setUser = useAuthStore(( state ) => state.setUser);

	const onSubmit = async ( formValues: SignInRequest ) => {
		try {
			const user = await signIn(formValues);
			if (user) {
				setUser(user);
				router.push("/recommended");
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='flex flex-col gap-2.5 md:gap-3.5 mb-5 md:max-w-118'>

					<div className='flex flex-col gap-2.5'>
						<div
							className="w-full bg-input-bg rounded-xl flex items-center gap-2.5 p-3.5 border border-transparent focus-within:border-light-gr">
							<label className='text-sm text-gray-text' htmlFor="email">Email:</label>
							<input {...register('email')} className='w-full bg-transparent outline-0' id="email"
								   name="email"
								   type="email"
								   required/>
						</div>
					</div>

					<div className='flex flex-col gap-2.5'>
						<div
							className="w-full bg-input-bg rounded-xl flex items-center gap-2.5 p-3.5 border mb-18">
							<label className='text-sm text-gray-text' htmlFor="password">Password:</label>
							<input {...register('password')} className='w-full bg-transparent outline-0' id="password"
								   name="password"
								   type={showPassword ? "text" : "password"}
								   required/>
							<button type='button' onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? <EyeIcon className='size-6 text-taupe-200'/> :
									<EyeSlashIcon className='size-6 text-taupe-200'/>}
							</button>

						</div>
					</div>
				</div>


				<div className='flex items-center gap-2.5 md:gap-3.5'>
					<button
						className='min-w-32.5 bg-primary text-secondary-bg text-[14px] font-bold px-7 py-3 rounded-4xl lg:hover:border-light-gr lg:hover:bg-background lg:hover:text-primary lg:cursor-pointer'
						type="submit"
					>
						Login
					</button>

					<Link href='/register'
						  className='underline text-gray-text text-sm lg:hover:text-primary'>Don’t have an account?
					</Link>
				</div>
			</form>

		</div>
	);
};

export default LoginForm;