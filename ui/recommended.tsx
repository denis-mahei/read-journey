'use client';

import useEmblaCarousel from "embla-carousel-react";

import Book from "@/ui/book";
import {RecommendedBook} from "@/lib/api/clientApi";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";


type RecommendedProps = {
	books: RecommendedBook[];
};

const Recommended = ( { books }: RecommendedProps ) => {
	const [emblaRef, emblaApi] = useEmblaCarousel();

	const next = () => emblaApi?.scrollNext()
	const prev = () => emblaApi?.scrollPrev()

	return (
		<div>
			<div className='flex justify-between mb-5.5'>
				<h1 className='text-xl font-bold md:text-[28px]'>Recommended</h1>
				<div className='flex gap-2'>
					<button onClick={prev}
							className='flex justify-center items-center border border-[#f9f9f920] rounded-full w-8 h-8'>
						<FiChevronLeft/>
					</button>
					<button onClick={next}
							className='flex justify-center items-center border border-[#f9f9f920] rounded-full w-8 h-8'>
						<FiChevronRight/>
					</button>
				</div>
			</div>

			<div className='overflow-hidden' ref={emblaRef}>
				<div className='flex gap-5'>
					{books.map(( book ) => (
						<Book key={book._id} book={book}/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Recommended;