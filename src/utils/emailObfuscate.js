import he from "he";

export function inner(email) {
	if (!email) {
		return "";
	}
	return email
		.split("")
		.reverse()
		.join("")
		.replace(".", ">b/<.oof>b<.")
		.split("")
		.reverse()
		.join("");
}

export function href(email) {
	if (!email) {
		return "";
	}
	return (
		he.encode("mai", { encodeEverything: true }) +
		"lto" +
		he.encode(":" + email, { encodeEverything: true })
	);
}

export default function obfuscateEmail(email) {
	const hrefVal = href(email);
	console.log({ hrefVal });
	const innerVal = inner(email);
	return {
		inner: innerVal,
		href: hrefVal,
		element: `<a href="${hrefVal}" target="_blank">${innerVal}</a>`,
	};
}
