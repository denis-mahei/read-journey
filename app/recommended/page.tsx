import {logout} from "@/lib/api";
import Image from "next/image";
import Home from "@/app/page";


const Page = () => {
	return (
		<div>
			<Image alt="hero" src="/images/iphone-desktop.png"/>

			<form action={logout}>
				<button>logout</button>
			</form>
		</div>
	);
}

export default Page;