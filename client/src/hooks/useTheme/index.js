import themes from "./themes.json";

export default function index() {
	const availableThemes = themes["available-themes"];

	function getCurrentTheme() {
		const currentTheme = localStorage.getItem("current-theme");
		if (!currentTheme) {
			localStorage.setItem("current-theme", "moon");
			return "default";
		}
		return currentTheme;
	}

	function setTheme(themeName) {
		if (!availableThemes.includes(themeName)) return;
		const properties = themes["available-properties"];
		const theme = themes[themeName];

		// Changing UI
		properties.forEach((property) => {
			document.documentElement.style.setProperty(`--${property}`, theme[property]);
		});
	}

	function changeTheme(themeName) {
		if (availableThemes.includes(themeName)) {
			// Saving state
			localStorage.setItem("current-theme", themeName);
			// Setting UI
			setTheme(themeName);
		}
	}
	return { getCurrentTheme, setTheme, changeTheme };
}
