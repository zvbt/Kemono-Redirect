browser.browserAction.onClicked.addListener(async (tab) => {
    browser.tabs.sendMessage(tab.id, { action: "getUserId" }, (response) => {
        if (response && response.userId) {
            browser.tabs.create({ url: `https://kemono.su/patreon/user/${response.userId}` });
        } else if (response && response.username) {
            browser.tabs.create({ url: `https://kemono.su/artists?q=${response.username}` });
        } else {
            alert("User ID or username not found!");
        }
    });
});
