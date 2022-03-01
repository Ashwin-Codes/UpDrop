import React from "react";
import "./css/Sidebar.css";

// Icon Imports
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { VscFileSubmodule } from "react-icons/vsc";
import { FiSettings } from "react-icons/fi";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { CgDrive } from "react-icons/cg";

import SidebarNavLinks from "./SidebarNavLinks";

export default function Sidebar() {
	return (
		<div className="sidebar">
			<div className="logoContainer">
				<p className="logo-up">Up</p>
				<p className="logo-down">Down</p>
				<FaCloudUploadAlt className="logo-icon" />
			</div>
			<ul className="sidebar-links">
				<SidebarNavLinks
					title="Dashboard"
					redirect="/dashboard"
					iconComponent={MdOutlineDashboard}
				/>
				<SidebarNavLinks
					title="Recent Files"
					redirect="/recents"
					iconComponent={VscFileSubmodule}
				/>
				{/* <SidebarNavLinks title="Space" redirect="/space" iconComponent={CgDrive} /> */}
				{/* <SidebarNavLinks
					title="Storage"
					redirect="/storage"
					iconComponent={MdDriveFileRenameOutline}
				/> */}
				<SidebarNavLinks
					title="Configure"
					redirect="/configure"
					iconComponent={FiSettings}
				/>
			</ul>
		</div>
	);
}
