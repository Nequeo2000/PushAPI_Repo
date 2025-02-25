async function subscribe(){
    let response = await fetch("https://192.168.178.43:5051/", {
        method: "GET"
    });
    let applicationServerKey = await response.text();

    let sw = await navigator.serviceWorker.ready;
    let push = await sw.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
    });
    console.log(JSON.stringify(push));

    response = await fetch("https://192.168.178.43:5051/", {
        method: "POST",
        body: JSON.stringify(push)
    });
    console.log(response);
}

// PWA SETUP
const registerServiceWorker = () => {
    if ("serviceWorker" in navigator) {
        try {
            navigator.serviceWorker.register("./sw.js").then(e => { console.log(e) });
        } catch (error) {
            console.error(`Registration failed with ${error}`);
        }
    }
};
registerServiceWorker();