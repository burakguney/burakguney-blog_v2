let sessionMessage = document.getElementById("sessionMessage");

if (sessionMessage === null) {
    console.log("Session message null ama dert değil.");
} else {
    sessionMessage.addEventListener("click", (e) => {
        if (e.target.className === "fa fa-times") {
            e.target.parentElement.parentElement.remove();
        }
    })
}

