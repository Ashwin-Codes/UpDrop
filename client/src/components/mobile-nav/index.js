import React from "react";

// Css and Icon Imports
import "./mobile-nav.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { FiSettings } from "react-icons/fi";

// Components Imports
import MobileNavLinks from "./MobileNavLinks";

export default function mobileNav({ toggleNav }) {
	return (
		<div className="backdrop" onClick={toggleNav}>
			<div className="mobile-nav">
				<div className="logoContainer">
					<p className="logo-up">Up</p>
					<p className="logo-down">Drop</p>
					<FaCloudUploadAlt className="logo-icon" />
				</div>
				<ul className="mobile-nav-links">
					<MobileNavLinks
						title="Dashboard"
						redirect="/dashboard"
						iconComponent={MdOutlineDashboard}
					/>
					<MobileNavLinks
						title="Configure"
						redirect="/configure"
						iconComponent={FiSettings}
					/>
				</ul>
			</div>
		</div>
	);
}
