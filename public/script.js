const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
 
form.addEventListener('submit', async function (e) {
  e.preventDefault();
 
  const userMessage = input.value.trim();
  if (!userMessage) return;
 
  appendMessage('user', userMessage);
  input.value = '';
 
  // Show a thinking indicator
  const thinkingIndicator = appendMessage('bot', 'Thinking...');
 
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });
 
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
 
    const data = await response.json();
 
    // Update the thinking indicator with the actual reply
    thinkingIndicator.textContent = data.reply;
  } catch (error) {
    console.error('Error fetching chat response:', error);
    thinkingIndicator.textContent = 'Sorry, something went wrong. Please try again.';
  }
});
 
function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg; // Return the element to allow modifying it later
}