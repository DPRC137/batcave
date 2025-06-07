const output = document.getElementById('output');
const input = document.getElementById('command-input');
const art = document.getElementById('ascii-art');

const batAscii = `
       _==_
    _(    )_   BAT HOTLINE
   /        \
  /__________\
  \          /
   \________/
`;
art.textContent = batAscii;

let dialed = false;

function appendOutput(text) {
  const line = document.createElement('div');
  line.textContent = text;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

async function askBatman(question) {
  if (!window.OPENAI_API_KEY) {
    appendOutput('OpenAI API key not set.');
    return;
  }
  appendOutput('Routing to the Batcomputer...');
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${window.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are Batman from DC Comics. Reply tersely by default but elaborate intelligently when prompted.' },
          { role: 'user', content: question }
        ]
      })
    });
    const data = await response.json();
    if (data.choices && data.choices[0]) {
      appendOutput(data.choices[0].message.content.trim());
    } else {
      appendOutput('No response from Batcomputer.');
    }
  } catch (e) {
    appendOutput('Error contacting Batcomputer.');
  }
}

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const text = input.value.trim();
    appendOutput(`hotline$ ${text}`);
    input.value = '';

    if (!dialed) {
      if (text.toLowerCase() === 'dial') {
        dialed = true;
        appendOutput('Establishing secure connection...');
        appendOutput('Connection complete. Batman here.');
      } else {
        appendOutput("Unknown command. Type 'dial' to call Batman.");
      }
    } else if (text) {
      askBatman(text);
    }
  }
});

appendOutput('Initializing Bat Hotline...');
appendOutput("Type 'dial' to contact Batman.");
input.focus();
