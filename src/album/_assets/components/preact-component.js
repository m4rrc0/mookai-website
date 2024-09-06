import { html, render } from "/assets/js/preact/preact.module.js?module";

function App(props) {
	console.log("Hello from Preact");
	return html`<p><strong>Hello ${props.name}!</strong></p>`;
}

export default function (el) {
	render(html`<${App} name="from Preact" />`, el);
}
