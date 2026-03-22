import Navbar from "@/ui/navbar";

const Layout = ( { children }: Readonly<{ children: React.ReactNode; }> ) => {
	return (
		<div className="p-5">
			<Navbar/>
			{children}
		</div>
	);
};

export default Layout;