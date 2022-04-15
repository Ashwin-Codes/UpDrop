import React, { useState, useEffect, useRef } from "react";

// Components
import Sidebar from "../../components/sidebar";
import MobileNav from "../../components/mobile-nav";
import useNotification from "../../hooks/useNotification";

// Css and icons
import "./Configure.css";
import { FaRegTimesCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

// configuration
import configuration from "../../configuration.json";

export default function Configure() {
	const [showMobileNav, setShowMobileNav] = useState(false);
	const [Notification, notify] = useNotification();

	function toggleMobileNav() {
		setShowMobileNav(!showMobileNav);
	}

	const portRef = useRef();
	const portInputRef = useRef();

	useEffect(() => {
		async function getCurrentPort() {
			let url = "/configuration/current-port";
			if (process.env.NODE_ENV === "development") {
				url = `http://localhost:${configuration.port}/configuration/current-port/`;
			}
			const response = await fetch(url);
			const data = await response.json();
			return data["current-port"];
		}
		getCurrentPort().then((res) => {
			portRef.current.innerText = `Current Port : ${res}`;
		});
	});

	function portChangeRequestHandler(e) {
		e.preventDefault();
		const newPort = portInputRef.current.value;
		if (newPort < 1024 || newPort > 49151) {
			notify("Allowed ports range from 1024 to 49151.", 8, "error");
			return;
		}
		portInputRef.current.value = "";

		let url = "/configuration/change-port";
		if (process.env.NODE_ENV === "development") {
			url = `http://localhost:${configuration.port}/configuration/change-port/`;
		}
		const body = { newPort };
		fetch(url, {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		});
		notify(`Port Changed to ${newPort}. Please navigate to new address.`, 20);
	}

	function shutdownServer() {
		let url = "/configuration/shutdown";
		if (process.env.NODE_ENV === "development") {
			url = `http://localhost:${configuration.port}/configuration/shutdown`;
		}
		const body = { shutdown: true };
		fetch(url, {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		});
		notify("Server have been Shutdown", 20);
	}

	return (
		<>
			<Notification />
			<div className="page">
				<Sidebar />
				{showMobileNav && <MobileNav toggleNav={toggleMobileNav} />}
				<div className="content">
					<div className="mobile-nav-container">
						<div className="page-title-container">
							<p className="page-title">Configure</p>
						</div>
						{showMobileNav ? (
							<FaRegTimesCircle
								className="nav-btn nav-close"
								onClick={toggleMobileNav}
							/>
						) : (
							<GiHamburgerMenu
								className="nav-btn nav-open"
								onClick={toggleMobileNav}
							/>
						)}
					</div>
					<div className="port-container">
						<h1 className="current-port" ref={portRef}>
							Current Port :
						</h1>
						<form className="port-change-form" onSubmit={portChangeRequestHandler}>
							<input
								type="number"
								className="port-input"
								ref={portInputRef}
								placeholder="eg. 1024"
							/>
							<button type="submit" className="port-submit-btn">
								CHANGE PORT
							</button>
						</form>
					</div>
					<div className="shutdown-server-btn-container">
						<button onClick={shutdownServer} className="shutdown-server-btn">
							SHUTDOWN SERVER
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
