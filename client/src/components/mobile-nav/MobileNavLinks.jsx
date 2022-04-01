import React from "react";
import { NavLink } from "react-router-dom";

export default function MobileNavLinks({ title, redirect, iconComponent }) {
	const Icon = iconComponent;
	return (
		<NavLink
			to={redirect}
			className={({ isActive }) => {
				if (isActive === true) {
					return "navlink link active-nav-link";
				} else {
					return "navlink link";
				}
			}}
		>
			<Icon className="link-icon" />
			{title}
		</NavLink>
	);
}
