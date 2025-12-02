import React from "react";
import { Link } from "@inertiajs/react";

const Layout = ({ children }: React.PropsWithChildren) => (
	<>
		<div className="min-h-screen bg-gray-100 p-8 dark:bg-gray-900">
			<nav className="flex items-start justify-center">
				<ul className="flex space-x-4">
					<li>
						<Link href="/" className="dark: text-white">Home</Link>
					</li>
				</ul>
			</nav>
			<div className="flex items-center justify-center mt-32">{children}</div>
		</div>
	</>
);

export default (page) => <Layout>{page}</Layout>;
