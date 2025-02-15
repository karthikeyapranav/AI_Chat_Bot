async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    // Display the user's message
    const chatBox = document.getElementById('chat-box');
    const userMessage = document.createElement('p');
    userMessage.textContent = `User: ${userInput}`;
    userMessage.classList.add('text-primary', 'font-weight-bold');
    chatBox.appendChild(userMessage);

    // Clear the input field
    document.getElementById('user-input').value = '';

    // Send the message to the Flask backend
    const response = await fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput })
    });

    const data = await response.json();

    // Display the bot's response
    const botMessage = document.createElement('p');
    botMessage.textContent = `Bot: ${data.response}`;
    botMessage.classList.add('text-success', 'font-weight-bold');
    chatBox.appendChild(botMessage);

    // Scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight;
}
