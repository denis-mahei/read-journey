import {getRecommendedBooks} from '@/lib/api/serverApi'; // серверна бо сторінка серверна

const RecommendedPage = async () => {
	const books = await getRecommendedBooks();
	console.log(books); // подивись структуру даних

	return (
		<div>
			<h1>Recommended</h1>
			<ul>
				{books.results.map(( book ) => (
					<li key={book._id}>{book.title}</li>
				))}
			</ul>
		</div>
	);
};

export default RecommendedPage;