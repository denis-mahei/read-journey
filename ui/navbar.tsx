'use client';

import Image from "next/image";
import MenuBurger from "@/ui/menu-burger";


const Navbar = () => {

	return (
		<div
			className="flex justify-between items-center text-5xl font-bold text-gray-200 bg-secondary-bg rounded-2xl p-5 mb-2.5 ">
			<>
				<Image src="/icons/logo-mb.png" alt="logo" width={42} height={17}
					   className="block md:hidden"/>
				<Image src="/icons/logo-lg.png" alt="logo" width={182} height={17}
					   className="hidden md:block"/>
			</>

			<MenuBurger/>
			
		</div>
	);
};

export default Navbar;