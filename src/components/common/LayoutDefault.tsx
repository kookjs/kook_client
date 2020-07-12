import React from "react";

import Header from './Header'
import Footer from './Footer'

export interface LayoutProps {
	name?: 'default';
	className?: string;
	children?: React.ReactNode
}

function Layout(props: LayoutProps) {
	const { className } = props
	return (
		<div className={"layout " + className}>
			<Header />
			<div className="main">
				{props.children}
			</div>
			<Footer />
		</div>
	);

}

export default Layout