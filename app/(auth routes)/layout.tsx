import Image from "next/image";
import {ReactNode} from "react";

const Layout = ( { children }: { children: ReactNode } ) => {
	return (
		<main className="flex flex-col lg:flex-row gap-4 p-5">
			<div className="w-full bg-secondary-bg p-5 rounded-4xl lg:w-1/2">
				<header>
					<Image src="/icons/logo-mb.png" alt="logo" width={42} height={17}
						   className="block md:hidden mb-10"/>
					<Image src="/icons/logo-lg.png" alt="logo" width={182} height={17}
						   className="hidden md:block mb-10"/>
					<p className='text-[32px] font-bold tracking-tight leading-none mb-5'>Expand your mind,
						reading <span
							className='text-span'>a book</span>
					</p>
				</header>
				{children}
			</div>
			<div
				className="w-full max-h-87.5 overflow-hidden bg-secondary-bg p-5 rounded-4xl lg:w-1/2 flex items-center justify-center md:hidden">
				<Image src='/images/iphone-mobile.png' width={255} height={518}
					   className="block md:hidden translate-y-25"
					   alt='hero mobile picture'/>
				<Image src='/images/iphone-desktop.png' width={405} height={834} alt='hero desktop picture'
					   className="hidden lg:block md:hidden"/>
			</div>
		</main>
	);
};

export default Layout;
