let storyData;
let userName = "";
let diceRoll = 0;

// Function to load the story JSON
async function loadStory() {
  try {
    const response = await fetch("story.json");
    storyData = await response.json();
    displayStory("start");
  } catch (error) {
    console.error("Error loading story:", error);
  }
}

// Function to display a specific story section
function displayStory(section) {
  const storyText = document.getElementById("story-text");
  const choicesContainer = document.getElementById("choices-container");

  const storySection = storyData[section];
  let text = storySection.text;

  // Replace placeholders with dynamic content
  if (text.includes("{name}")) {
    text = text.replace("{name}", userName);
  }
  if (text.includes("{outcome}")) {
    const outcome = diceRoll <= 3 ? "You found gold!" : "A monster appears!";
    text = text.replace("{outcome}", outcome);
  }

  storyText.textContent = text;

  // Clear previous choices
  choicesContainer.innerHTML = "";

  for (const [key, value] of Object.entries(storySection.choices)) {
    if (key === "nameInput") {
      const input = document.createElement("input");
      input.placeholder = "Enter your name";
      const button = document.createElement("button");
      button.textContent = value;
      button.addEventListener("click", () => {
        userName = input.value || "Adventurer";
        displayStory("nameInput");
      });
      choicesContainer.appendChild(input);
      choicesContainer.appendChild(button);
    } else if (key === "rollDice") {
      const button = document.createElement("button");
      button.textContent = value;
      button.addEventListener("click", () => {
        diceRoll = Math.floor(Math.random() * 6) + 1;
        displayStory("rollOutcome");
      });
      choicesContainer.appendChild(button);
    } else {
      const button = document.createElement("button");
      button.textContent = value;
      button.addEventListener("click", () => displayStory(key));
      choicesContainer.appendChild(button);
    }
  }
}

// Initialize the app
loadStory();
