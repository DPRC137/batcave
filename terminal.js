const output = document.getElementById('output');
const input = document.getElementById('command-input');
const art = document.getElementById('ascii-art');

const batAscii = `
   _==_                     
 _(    )_  __ BatLine __    
/        \  Ask Batman      
 \      /                   
  \____/                    
`;
art.textContent = batAscii;

const commandInfo = {
  help: { description: 'List commands or details about one', recommend: 'intel && suspects' },
  clear: { description: 'Clear the screen' },
  intel: { description: 'Retrieve latest intelligence from sensors', recommend: 'locations && investigate' },
  suspects: { description: 'Show persons of interest', recommend: 'investigate' },
  locations: { description: 'Display known hotspots', recommend: 'intel' },
  investigate: { description: 'Deploy field resources', recommend: 'intel && locations' },
  date: { description: 'Display system date' },
  whoami: { description: 'Identify the current user' },
  about: { description: 'Open information page' },
  gallery: { description: 'Open gallery page' },
  ask: { description: 'Ask Batman a question' }
};

const commandList = Object.keys(commandInfo);

async function askBatman(question) {
  if (!window.OPENAI_API_KEY) {
    appendOutput('OpenAI API key not set.');
    return;
  }
  appendOutput('Consulting the Batcomputer...');
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
          { role: 'system', content: 'You are Batman from DC Comics. Reply in short, gritty sentences and never break character.' },
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

function appendOutput(text) {
  const line = document.createElement('div');
  line.textContent = text;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

function appendSuggestion(text) {
  const line = document.createElement('div');
  line.textContent = text;
  line.className = 'suggestion';
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

function clearOutput() {
  output.innerHTML = '';
}

function runSingleCommand(cmd) {
  appendOutput(`batline$ ${cmd}`);
  const args = cmd.split(/\s+/);
  const base = args[0];

  switch (base) {
    case 'help':
      if (args[1] && commandInfo[args[1]]) {
        appendOutput(`${args[1]}: ${commandInfo[args[1]].description}`);
      } else {
        appendOutput('Available commands: ' + commandList.join(', '));
        appendOutput('Use Tab for autocomplete and combine commands with && or ;');
      }
      break;
    case 'clear':
      clearOutput();
      break;
    case 'intel':
      appendOutput('Retrieving data from GCPD servers and WayneTech satellites...');
      appendOutput('Analyzing crime patterns and scanning surveillance feeds...');
      break;
    case 'suspects':
      appendOutput('Persons of interest:\n1. The Joker\n2. The Penguin\n3. Two-Face\n4. Harley Quinn');
      break;
    case 'locations':
      appendOutput('Current hotspots:\n- Arkham Asylum\n- Ace Chemical Plant\n- Crime Alley\n- The Iceberg Lounge');
      break;
    case 'investigate':
      appendOutput('Deploying remote drones and gathering evidence...');
      appendOutput('Cross-referencing clues with the Batcomputer...');
      break;
    case 'date':
      appendOutput(new Date().toString());
      break;
    case 'whoami':
      appendOutput('You are the Batman.');
      break;
    case 'about':
      window.location.href = 'about.html';
      break;
    case 'gallery':
      window.location.href = 'gallery.html';
      break;
    case 'ask':
      askBatman(args.slice(1).join(' '));
      break;
    case '':
      break;
    default:
      askBatman(cmd);
      return;
  }

  if (commandInfo[base] && commandInfo[base].recommend) {
    appendSuggestion(`Recommendation: try '${commandInfo[base].recommend}'`);
  }
}

function processCommand(line) {
  const parts = line.split(/&&|;/).map(p => p.trim()).filter(Boolean);
  for (const part of parts) {
    runSingleCommand(part);
  }
}

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    processCommand(input.value.trim());
    input.value = '';
  } else if (event.key === 'Tab') {
    event.preventDefault();
    const text = input.value.trim();
    if (text.length > 0 && !text.includes(' ')) {
      const match = commandList.find(c => c.startsWith(text));
      if (match) {
        input.value = match + ' ';
      }
    }
  }
});

// Intro message
appendOutput('Initializing WayneTech OS 7.4...');
appendOutput('Access granted. Batman here.');
appendOutput("Type 'help' for commands or just ask me.");
input.focus();
