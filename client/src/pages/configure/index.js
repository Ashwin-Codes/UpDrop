import React, { useState } from "react";

// Components
import Sidebar from "../../components/sidebar";
import MobileNav from "../../components/mobile-nav";

// Css and icons
import "./Configure.css";
import { FaRegTimesCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Configure() {
	const [showMobileNav, setShowMobileNav] = useState(false);

	function toggleMobileNav() {
		setShowMobileNav(!showMobileNav);
	}

	return (
		<div className="page">
			<Sidebar />
			{showMobileNav && <MobileNav toggleNav={toggleMobileNav} />}
			<div className="content">
				<div className="mobile-nav-container">
					<div className="page-title-container">
						<p className="page-title">Configure</p>
					</div>
					{showMobileNav ? (
						<FaRegTimesCircle className="nav-btn nav-close" onClick={toggleMobileNav} />
					) : (
						<GiHamburgerMenu className="nav-btn nav-open" onClick={toggleMobileNav} />
					)}
				</div>
			</div>
		</div>
	);
}
