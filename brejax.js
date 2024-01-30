document.addEventListener("DOMContentLoaded", function() {
    const colorPicker = document.getElementById("colorPicker");
    const colorCode = document.getElementById("colorCode");
    const testView = document.getElementById("testView");

    const colors = generateAllColors();
    colors.forEach(color => {
      const colorCircle = document.createElement("div");
      colorCircle.classList.add("color");
      colorCircle.style.backgroundColor = color;
      colorCircle.addEventListener("click", function() {
        const selectedColor = this.style.backgroundColor;
        const discordColorCode = rgbToHex(selectedColor);
        colorCode.innerHTML = `
          <span class="text-left">Here is the color code:</span> 
          <span class="code-block">${discordColorCode}</span>`;
        createTestView(discordColorCode);
      });
      colorPicker.appendChild(colorCircle);
    });

    colorPicker.classList.remove("hidden");
    colorCode.classList.remove("hidden");
    testView.classList.remove("hidden");
  });

  function createTestView(color) {
    const testView = document.getElementById("testView");
    const embedTitle = "Live Test View";
    const embedDescription = "Here is your current color in the embed!";
    
    const embed = document.createElement("div");
    embed.classList.add("discord-embed");
    
    const leftStrip = document.createElement("div");
    leftStrip.classList.add("discord-embed-left-strip");
    leftStrip.style.backgroundColor = color;
embed.appendChild(leftStrip);
    
    const rightContent = document.createElement("div");
    rightContent.classList.add("discord-embed-right-content");
    
    const title = document.createElement("div");
    title.classList.add("discord-embed-title");
    title.textContent = embedTitle;
    rightContent.appendChild(title);
    
    const description = document.createElement("div");
    description.classList.add("discord-embed-description");
    description.textContent = embedDescription;
    rightContent.appendChild(description);
    
    embed.appendChild(rightContent);
    
    testView.innerHTML = '';
    testView.appendChild(embed);
}

function generateAllColors() {
    const colors = [];
    for (let r = 0; r <= 255; r += 51) {
      for (let g = 0; g <= 255; g += 51) {
        for (let b = 0; b <= 255; b += 51) {
          colors.push(`rgb(${r}, ${g}, ${b})`);
        }
      }
    }
    return colors;
}

function rgbToHex(rgb) {
    // Convert RGB string (e.g., "rgb(255, 0, 0)") to HEX string (e.g., "#ff0000") ...
    const values = rgb.match(/\d+/g);
    const r = parseInt(values[0]);
    const g = parseInt(values[1]);
    const b = parseInt(values[2]);
    const hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex.toLowerCase();
}
