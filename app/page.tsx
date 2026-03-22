import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export default async function Home() {
	const store = await cookies();
	if (store.get('accessToken') || store.get('token')) {
		redirect('/recommended');
	} else {
		redirect('/register');
	}
	return (
		<div className="">
			Home
		</div>
	);
}

