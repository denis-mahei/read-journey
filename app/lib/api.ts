"use server";

import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import type {SignUpBody, SignUpResponse} from "@/types/auth";

export async function signUp( formData: SignUpBody ) {

	const res = await fetch("https://readjourney.b.goit.study/api/users/signup", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(formData),
	});

	if (!res.ok) {
		const error = await res.json();
		return { error: error.message || "Registration failed" };
	}

	const data: SignUpResponse = await res.json();

	( await cookies() ).set("token", data.token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: 60 * 60 * 24 * 7,
		path: "/",
	});

	redirect("/recommended");
}

export async function signIn( formData: SignUpBody ) {
	const res = await fetch("https://readjourney.b.goit.study/api/users/signin", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(formData),
	});

	if (!res.ok) {
		const error = await res.json();
		return { error: error.message || "Login failed" };
	}

	const data: SignUpResponse = await res.json();

	( await cookies() ).set("token", data.token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: 60 * 60 * 24 * 7,
		path: "/",
	});

	redirect("/recommended");
}

export async function logout() {
	( await cookies() ).delete("token");
	redirect("/login");
}
