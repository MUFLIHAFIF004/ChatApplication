const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-message');
const sendButton = document.getElementById('send-button');

// Load chat history from localStorage
const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];

function renderMessages() {
    chatBox.innerHTML = '';
    chatHistory.forEach(({ sender, message }) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = message;
        chatBox.appendChild(messageDiv);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage(sender, message) {
    chatHistory.push({ sender, message });
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    renderMessages();
}

// Event listener for send button
sendButton.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (message) {
        sendMessage('user', message);
        userInput.value = '';

        // Simulate bot response
        setTimeout(() => {
            sendMessage('bot', 'Bot menjawab: ' + message);
        }, 1000);
    }
});

// Render messages on load
renderMessages();
