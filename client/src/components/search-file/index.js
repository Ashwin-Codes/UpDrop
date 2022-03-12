import React from "react";

// Css and Icons Imports
import "./FileSearchForm.css";
import { HiSearchCircle } from "react-icons/hi";

export default function FileSearchForm({ searchInputRef, onChange }) {
	return (
		<form className="form">
			<button className="searchBtn">
				<HiSearchCircle />
			</button>
			<input
				type="text"
				className="searchInput"
				placeholder="Search"
				onChange={onChange}
				ref={searchInputRef}
			/>
		</form>
	);
}
