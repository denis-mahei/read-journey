import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline";
import Link from "next/link";

const RegisterForm = () => {
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='flex flex-col gap-2.5 mb-5'>

					<div className='flex flex-col gap-2.5'>
						<div
							className="w-full bg-input-bg rounded-xl flex items-center gap-2.5 p-3.5 border border-transparent focus-within:border-light-gr">
							<label className='text-[12px] text-gray-text' htmlFor="name">Name:</label>
							<input className='bg-transparent outline-0' id="name" name="name"
								   type="text" required/>
						</div>
					</div>

					<div className='flex flex-col gap-2.5'>
						<div
							className="w-full bg-input-bg rounded-xl flex items-center gap-2.5 p-3.5 border border-transparent focus-within:border-light-gr">
							<label className='text-[12px] text-gray-text' htmlFor="email">Email:</label>
							<input className='bg-transparent outline-0' id="email" name="email" type="email"
								   required/>
						</div>
					</div>

					<div className='flex flex-col gap-2.5'>
						<div
							className="w-full bg-input-bg rounded-xl flex items-center gap-2.5 p-3.5 border">
							<label className='text-[12px] text-gray-text' htmlFor="password">Password:</label>
							<input className='bg-transparent outline-0' id="password" name="password"
								   type={showPassword ? "text" : "password"}
								   required/>
							<button type='button' onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? <EyeIcon className='size-6 text-taupe-200'/> :
									<EyeSlashIcon className='size-6 text-taupe-200'/>}
							</button>

						</div>
					</div>
				</div>


				<div className='flex items-center gap-2.5'>
					<button
						className='min-w-32.5 bg-primary text-secondary-bg text-[14px] font-bold px-7 py-3 rounded-4xl lg:hover:border-light-gr lg:hover:bg-background lg:hover:text-primary lg:cursor-pointer'
						type="submit"
					>
						Registration
					</button>

					<Link href='/login'
						  className='underline text-gray-text text-sm lg:hover:text-primary'>Already
						have an
						account?</Link>
				</div>
			</form>

		</div>
	);
};

export default RegisterForm;