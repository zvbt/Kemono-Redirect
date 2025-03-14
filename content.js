browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getUserId") {
        let userId = null;
        let username = null;

        try {
            const pageSource = document.documentElement.innerHTML;
            const match = pageSource.match(/"creator":\s?\{[^}]*?"id":\s?"(\d+)"/);

            if (match) {
                userId = match[1];
                console.log("User ID found:", userId);
            }

            if (!userId) {
                const usernameElement = document.querySelector(".sc-bdvvtL.cSjQav");
                if (usernameElement) {
                    username = usernameElement.textContent.trim();
                    console.log("Username found:", username);
                }
            }

        } catch (e) {
            console.error("Error extracting Patreon user ID or username", e);
        }

        sendResponse({ userId, username });
    }
});
