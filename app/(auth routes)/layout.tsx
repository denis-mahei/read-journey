import Image from "next/image";
import {ReactNode} from "react";

const Layout = ( { children }: { children: ReactNode } ) => {
	return (
		<main className="flex flex-col lg:flex-row gap-4 p-5 md:h-screen">
			<div
				className="w-full bg-secondary-bg px-5 pt-5 pb-10 rounded-4xl lg:w-1/2 md:px-16 md:py-10">
				<header>
					<Image src="/icons/logo-mb.png" alt="logo" width={42} height={17}
						   className="block md:hidden mb-10"/>
					<Image src="/icons/logo-lg.png" alt="logo" width={182} height={17}
						   className="hidden md:block md:mb-39.25"/>
					<p className='text-3xl md:text-6xl font-bold tracking-tight leading-none mb-5 md:max-w-120'>Expand
						your mind,
						reading <span
							className='text-span'>a book</span>
					</p>
				</header>
				{children}
			</div>
			<div
				className="w-full overflow-hidden bg-secondary-bg p-5 rounded-4xl lg:w-1/2 flex items-center justify-center md:hidden lg:flex">
				<Image src='/images/iphone-mobile.png' width={255} height={518}
					   className="block md:hidden translate-y-25"
					   alt='hero mobile picture'/>
				<Image src='/images/iphone-desktop.png' width={411} height={835} alt='hero desktop picture'
					   className="hidden lg:block translate-y-25"/>
			</div>
		</main>
	);
};

export default Layout;
