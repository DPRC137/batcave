const output = document.getElementById('output');
const input = document.getElementById('command-input');

function appendOutput(text) {
  const line = document.createElement('div');
  line.textContent = text;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

function clearOutput() {
  output.innerHTML = '';
}

function processCommand(cmd) {
  appendOutput(`batcave$ ${cmd}`);
  switch (cmd) {
    case 'help':
      appendOutput('Available commands: help, clear, intel, suspects, locations, investigate, date, whoami');
      break;
    case 'clear':
      clearOutput();
      break;
    case 'intel':
      appendOutput('Retrieving data from GCPD servers and WayneTech satellites...');
      appendOutput('Crime levels spiking near the Narrows. Facial recognition algorithms scanning CCTV feeds.');
      break;
    case 'suspects':
      appendOutput('Persons of interest:\n1. The Joker\n2. The Penguin\n3. Two-Face\n4. Harley Quinn');
      break;
    case 'locations':
      appendOutput('Current hotspots:\n- Arkham Asylum\n- Ace Chemical Plant\n- Crime Alley\n- The Iceberg Lounge');
      break;
    case 'investigate':
      appendOutput('Deploying remote drones and gathering evidence...');
      appendOutput('Cross-referencing clues... A suspicious van spotted near Crime Alley.');
      break;
    case 'date':
      appendOutput(new Date().toString());
      break;
    case 'whoami':
      appendOutput('You are the Batman.');
      break;
    case '':
      break;
    default:
      appendOutput(`Command not recognized: ${cmd}`);
  }
}

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    processCommand(input.value.trim());
    input.value = '';
  }
});

// Intro message
appendOutput('Initializing WayneTech OS...');
appendOutput('Access granted. Welcome back, Batman.');
appendOutput("Type 'help' to begin your investigation.");
input.focus();
