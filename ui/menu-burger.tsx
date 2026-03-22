'use client';

import {useState} from "react";
import Link from "next/link";
import {IoClose} from "react-icons/io5";
import {HiMenuAlt3} from "react-icons/hi";


const MenuBurger = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => {
		setIsOpen(prevState => !prevState);
	}
	return <>
		<button onClick={handleOpen}>
			<HiMenuAlt3 size={28}/>
		</button>
		{isOpen && (
			<div className="fixed top-0 left-0 w-full h-screen flex z-20">
				<div
					className="w-1/2 bg-background/60"
					onClick={handleOpen}
				/>
				<div className="w-1/2 h-full bg-input-bg relative flex flex-col items-center justify-center">
					<button onClick={handleOpen} className="absolute top-10 right-10"><IoClose size={28}/></button>
					<ul className="flex flex-col gap-6">
						<li>
							<Link href='/'>Home</Link>
						</li>
						<li>
							<Link href='/library'>My library</Link>
						</li>
					</ul>
				</div>
			</div>
		)}
	</>;
};

export default MenuBurger;