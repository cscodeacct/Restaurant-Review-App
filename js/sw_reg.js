document.addEventListener("DOMContentLoaded", event => {
	/* Service Worker Registration */

	if (navigator.serviceWorker) {
		navigator.serviceWorker
			.register("/sw.js")
			.then(registration => console.log("Service Worker registered successfully", registration))
			.catch(e => console.log("Registration failed :(", e));
	}
});