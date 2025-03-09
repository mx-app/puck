
async function apiGetProfile(userId) {
    try {
        const response = await fetch(`${urlPrefix}/profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: userId })
        });
        if (!response.ok) {
            throw new Error(`Error fetching profile: ${response.statusText}`);
        }
        const data = await response.json();
        // sendLogToServer(`apiGetProfile_data ${data}`);
        return data;
    } catch (error) {
        sendLogToServer(`error ${error}`);
        return null;
    }
};


async function apiDailyClick(userId) {
    try {
        const response = await fetch(`${urlPrefix}/daily`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: userId})
        });
        if (!response.ok) {
            throw new Error(`Error fetching dailyClick: ${response.statusText}`);
        }
        const data = await response.json();
        // sendLogToServer(`dailyClick_data ${data}`);
        return data;
    } catch (error) {
        sendLogToServer(`error ${error}`);
        return null;
    }
};


async function apiTaskClick(taskData) {
    try {
        const response = await fetch(`${urlPrefix}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        });
        if (!response.ok) {
            throw new Error(`Error fetching taskClick: ${response.statusText}`);
        }
        const data = await response.json();
        // sendLogToServer(`taskClick_data ${data}`);
        return data;
    } catch (error) {
        sendLogToServer(`error ${error}`);
        return null;
    }
}


async function apiStartGame(userId) {
    try {
        const response = await fetch(`${urlPrefix}/start_game`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: userId })
        });
        if (!response.ok) {
            throw new Error(`Error fetching start_game: ${response.statusText}`);
        }
        const data = await response.json();
        // sendLogToServer(`userStartGame_data ${data}`);
        return data;
    } catch (error) {
        sendLogToServer(`error ${error}`);
        return null;
    }
}

async function apiEndGame(gameData) {
    try {
        const response = await fetch(`${urlPrefix}/end_game`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gameData)
        });
        if (!response.ok) {
            throw new Error(`Error fetching end_game: ${response.statusText}`);
        }
        const data = await response.json();
        // sendLogToServer(`userEndGame_data ${data}`);
        return data;
    } catch (error) {
        sendLogToServer(`error ${error}`);
        return null;
    }
}

async function apiFriendsClaim(userId) {
    try {
        const response = await fetch(`${urlPrefix}/friends_claim`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userId)
        });
        if (!response.ok) {
            throw new Error(`Error fetching friends_claim: ${response.statusText}`);
        }
        const data = await response.json();
        // sendLogToServer(`FriendsClaim_data ${data}`);
        return data;
    } catch (error) {
        sendLogToServer(`error ${error}`);
        return null;
    }
}

async function apiGetHall(userId) {
    try {
        const response = await fetch(`${urlPrefix}/hall`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: userId })
        });
        if (!response.ok) {
            throw new Error(`Error fetching hall: ${response.statusText}`);
        }
        const data = await response.json();
        // sendLogToServer(`apiGetHall_data ${data}`);
        return data;
    } catch (error) {
        sendLogToServer(`error ${error}`);
        return null;
    }
};