// Icons
import { IoMdImage as imageIcon } from "react-icons/io";
import { RiMovieFill as videoIcon } from "react-icons/ri";
import { AiFillAudio as audioIcon } from "react-icons/ai";
import { AiFillFileZip as compressedIcon } from "react-icons/ai";
import { AiFillFileText as textIcon } from "react-icons/ai";
import { BsFillFileBinaryFill as binaryIcon } from "react-icons/bs";
import { AiFillCode as codeIcon } from "react-icons/ai";
import { AiFillFolder as folderIcon } from "react-icons/ai";
import { AiFillFileUnknown as unknownIcon } from "react-icons/ai";

// File Types
const image = [
	".apng",
	".avif",
	".gif",
	".jpg",
	".jpeg",
	".jfif",
	".pjpeg",
	".pjp",
	".png",
	".svg",
	".webp",
	".bmp",
	".ico",
	".cur",
	".tif",
	".tiff",
];
const video = [
	".3gp",
	".3g2",
	".avi",
	".flv",
	".h264",
	"mp4",
	".mkv",
	".mov",
	".mp4",
	".mpeg",
	".mpg",
	".rm",
	".swf",
	".vob",
	".wmv",
];
const audio = [".aif", ".cda", ".mid", ".midi", ".mp3", ".mpa", ".ogg", ".wav", ".wma", ".wpl"];
const text = [".doc", ".odt", ".pdf", ".rtf", ".tex", ".txt", ".wpd", ".text", ".md"];
const compressed = [
	".7z",
	".arj",
	".deb",
	".pkg",
	".rar",
	".rpm",
	".tar.gz",
	".tar",
	".gz",
	".z",
	".zip",
];
const binary = [".apk", ".bat", ".bin", ".gadget", ".msi", ".wsf", ".exe"];
const code = [
	".asp",
	".aspx",
	".axd",
	".asx",
	".asmx",
	".ashx",
	".css",
	".cfm",
	".yaws",
	".swf",
	".html",
	".htm",
	".xhtml",
	".jhtml",
	".jsp",
	".jspx",
	".wss",
	".do",
	".action",
	".js",
	".jsx",
	".pl",
	".php",
	".php4",
	".php3",
	".phtml",
	".py",
	".rb",
	".rhtml",
	".shtml",
	".xml",
	".rss",
	".svg",
	".cgi",
	".dll",
	".sh",
];

// Checks Extensions and detect file type
const getFileType = (ext) => {
	if (image.includes(ext)) {
		return "image";
	} else if (video.includes(ext)) {
		return "video";
	} else if (text.includes(ext)) {
		return "text";
	} else if (compressed.includes(ext)) {
		return "compressed";
	} else if (audio.includes(ext)) {
		return "audio";
	} else if (binary.includes(ext)) {
		return "binary";
	} else if (code.includes(ext)) {
		return "code";
	} else {
		return "unknown";
	}
};

// Returns File Icons as Per File Type
function setIcon(ele) {
	if (ele.isFolder === true) return folderIcon;
	const type = getFileType(ele.ext);
	if (type === "image") {
		return imageIcon;
	} else if (type === "video") {
		return videoIcon;
	} else if (type === "text") {
		return textIcon;
	} else if (type === "compressed") {
		return compressedIcon;
	} else if (type === "audio") {
		return audioIcon;
	} else if (type === "binary") {
		return binaryIcon;
	} else if (type === "code") {
		return codeIcon;
	} else {
		return unknownIcon;
	}
}
export { getFileType, setIcon };
