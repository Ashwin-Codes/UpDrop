import React from "react";

// Css and Icon Imports
import "./Sidebar.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { FiSettings } from "react-icons/fi";

// Components Imports
import SidebarNavLinks from "./SidebarNavLinks";

export default function Sidebar() {
	return (
		<div className="sidebar">
			<div className="logoContainer">
				<p className="logo-up">Up</p>
				<p className="logo-down">Drop</p>
				<FaCloudUploadAlt className="logo-icon" />
			</div>
			<ul className="sidebar-links">
				<SidebarNavLinks
					title="Dashboard"
					redirect="/dashboard"
					iconComponent={MdOutlineDashboard}
				/>
				<SidebarNavLinks
					title="Configure"
					redirect="/configure"
					iconComponent={FiSettings}
				/>
			</ul>
		</div>
	);
}
