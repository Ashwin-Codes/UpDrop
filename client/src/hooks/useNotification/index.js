import React, { useState, useCallback } from "react";

// Css and Icons Imports
import "./Notification.css";
import { MdError as errorIcon } from "react-icons/md";
import { IoCheckmarkDoneCircleSharp as successIcon } from "react-icons/io5";

export default function Index() {
	const [visible, setVisible] = useState(false);
	const [msg, setMsg] = useState("Henlo");
	const [iconType, setIconType] = useState("success");
	function Notification() {
		let Icon;

		if (iconType === "success") {
			Icon = successIcon;
		} else if (iconType === "error") {
			Icon = errorIcon;
		}

		return (
			<div className={visible ? `notification ${iconType}` : "hide"}>
				<Icon className="notificationIcon" />
				<div className="msgContainer">
					<p className="msg">{msg}</p>
				</div>
			</div>
		);
	}

	const notify = useCallback((msg, duration = 3, type = "success") => {
		if (type === "success") {
			setIconType("success");
		} else if (type === "error") {
			setIconType("error");
		}

		setMsg(msg);
		setVisible(true);
		setTimeout(() => {
			setVisible(false);
		}, duration * 1000);
	}, []);
	return [Notification, notify];
}
