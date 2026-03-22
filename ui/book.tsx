'use client';

import Image from "next/image";
import {RecommendedBook} from "@/lib/api/clientApi";

type BookProps = {
	book: RecommendedBook;
};

const Book = ( { book }: BookProps ) => {
	return (
		<div className='flex flex-[0_0_auto] flex-col'>
			{book.imageUrl && (
				<Image alt={book.title} src={book.imageUrl} width={137} height={208} className='rounded-md mb-2'/>
			)}
			<h2 className='text-[14px] font-bold'>{book.title.slice(0, 16).trim() + '...'}</h2>
			{book.author && <p>{book.author}</p>}
		</div>
	);
};

export default Book;