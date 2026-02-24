"use client";

import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {useAuthStore} from "@/lib/store/authStore";

interface LoginFormData {
	email: string;
	password: string;
}

export default function LoginPage() {
	const router = useRouter();
	const { signIn, isLoading, error, clearError } = useAuthStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>();

	const onSubmit = async ( data: LoginFormData ) => {
		try {
			await signIn(data);
			router.push("/recommended");
		} catch {
			// помилка вже збережена у store
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				{/* Email */}
				<div>
					<label>Email</label>
					<input
						type="email"
						placeholder="your@email.com"
						{...register("email", {
							required: "Email обов'язковий",
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: "Невірний формат email",
							},
						})}
					/>
					{errors.email && (
						<span>{errors.email.message}</span>
					)}
				</div>

				{/* Password */}
				<div>
					<label>Пароль</label>
					<input
						type="password"
						placeholder="Твій пароль"
						{...register("password", {
							required: "Пароль обов'язковий",
						})}
					/>
					{errors.password && (
						<span>{errors.password.message}</span>
					)}
				</div>

				{/* Server error */}
				{error && (
					<div onClick={clearError}>
						{error}
					</div>
				)}

				<button
					type="submit"
					disabled={isLoading}
				>
					{isLoading ? "Вхід..." : "Увійти"}
				</button>
			</form>

			<p>
				Ще немає акаунту?{" "}
				<Link href="/register">
					Зареєструватись
				</Link>
			</p>
		</>
	);
}