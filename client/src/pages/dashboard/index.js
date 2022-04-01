import React, { useRef, useState } from "react";

// Components
import Sidebar from "../../components/sidebar";
import FileSearchForm from "../../components/search-file";
import Files from "../../components/files";
import MobileNav from "../../components/mobile-nav";

// CSS and Icons
import "./Dashboard.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegTimesCircle } from "react-icons/fa";

export default function Dashboard() {
	const [searchInputText, setSearchInputText] = useState("");
	const [showMobileNav, setShowMobileNav] = useState(false);
	const searchInputRef = useRef();

	function getSearchText() {
		setSearchInputText(searchInputRef.current.value);
	}

	function toggleMobileNav() {
		setShowMobileNav(!showMobileNav);
	}

	return (
		<div className="page">
			<Sidebar />
			{showMobileNav && <MobileNav toggleNav={toggleMobileNav} />}
			<div className="content">
				<div className="search-and-nav-container">
					<FileSearchForm searchInputRef={searchInputRef} onChange={getSearchText} />
					{showMobileNav ? (
						<FaRegTimesCircle className="nav-btn nav-close" onClick={toggleMobileNav} />
					) : (
						<GiHamburgerMenu className="nav-btn nav-open" onClick={toggleMobileNav} />
					)}
				</div>
				<Files searchInputText={searchInputText} />
			</div>
		</div>
	);
}
