self.addEventListener("push", (event)=>{
    let options = {
        body: "options Body",
        icon: "",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 2
        },
        actions: [
            {
                action: "explore", title: "explore this world", icon: "images/checkmark.png"
            }
        ]
    };
    let text = event.data.text();
    console.log(text);
    event.waitUntil(
        self.registration.showNotification(text, options)
    );
});