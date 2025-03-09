//Логгер

function sendLogToServer(message) {
    fetch(`${urlPrefix}/log`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message }) // Передаем сообщение лога
    })
    .then(response => response.json())
}