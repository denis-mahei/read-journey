import {getServerMe} from "@/lib/api/serverApi";

const Page = async () => {
	const profile = await getServerMe()

	return (
		<div>

		</div>
	);
};

export default Page;