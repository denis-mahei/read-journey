import {getRecommendedBooks} from '@/lib/api/serverApi'; // серверна бо сторінка серверна
import {redirect} from 'next/navigation';
import Recommended from "@/ui/recommended";

const RecommendedPage = async () => {
	try {
		const { results } = await getRecommendedBooks();

		return (
			<div className="rounded-4xl py-10 px-5 bg-secondary-bg md:p-10">
				<Recommended books={results}/>
			</div>
		);
	} catch {
		redirect('/login');
	}
};

export default RecommendedPage;