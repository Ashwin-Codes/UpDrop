import React, { useState } from "react";

// Css
import "./ThemeCompo.css";

// Themes
import themes from "../../hooks/useTheme/themes.json";

// Hooks
import useTheme from "../../hooks/useTheme";

function SingleTheme({ name, primaryColor, textColor, clickHandler, activeTheme }) {
	return (
		<div
			className={activeTheme ? "single-theme active-theme" : "single-theme"}
			style={{ backgroundColor: primaryColor }}
			onClick={clickHandler}
		>
			<h1 style={{ color: textColor }}>{name}</h1>
		</div>
	);
}

export default function Index() {
	const { getCurrentTheme, changeTheme } = useTheme();
	const [currentTheme, setCurrentTheme] = useState(getCurrentTheme());

	function themeClickHandler(themeName) {
		changeTheme(themeName);
		setCurrentTheme(themeName);
	}

	const themeArray = themes["available-themes"].map((theme) => {
		return (
			<SingleTheme
				name={theme}
				primaryColor={themes[theme]["primary-color"]}
				textColor={themes[theme]["font-color-text"]}
				key={theme}
				clickHandler={() => {
					themeClickHandler(theme);
				}}
				activeTheme={currentTheme === theme}
			/>
		);
	});

	return <div className="theme-container">{themeArray}</div>;
}
