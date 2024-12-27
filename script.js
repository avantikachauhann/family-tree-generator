const iconOptions = [
  "./icons/1.png",
  "./icons/2.png",
  "./icons/3.png",
  "./icons/4.png",
  "./icons/5.png",
  "./icons/6.png",
  "./icons/7.png",
  "./icons/8.png",
  "./icons/9.png",
  "./icons/10.png",
];

let treeData = [];
let relationships = [];

// Function to display a mini preview grid for icon selection
function selectIcon(callback) {
  const modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.top = "50%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-50%, -50%)";
  modal.style.padding = "20px";
  modal.style.backgroundColor = "#fff";
  modal.style.border = "1px solid #ccc";
  modal.style.borderRadius = "10px";
  modal.style.zIndex = 1000;
  modal.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";

  const grid = document.createElement("div");
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = "repeat(5, 1fr)";
  grid.style.gap = "10px";

  iconOptions.forEach((icon, index) => {
    const iconDiv = document.createElement("div");
    iconDiv.style.cursor = "pointer";
    iconDiv.style.textAlign = "center";

    const img = document.createElement("img");
    img.src = icon;
    img.alt = `Icon ${index + 1}`;
    img.style.width = "50px";
    img.style.height = "50px";
    img.style.border = "1px solid #ccc";
    img.style.borderRadius = "5px";

    iconDiv.appendChild(img);
    iconDiv.onclick = () => {
      callback(icon);
      document.body.removeChild(modal);
    };

    grid.appendChild(iconDiv);
  });

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.style.marginTop = "20px";
  closeButton.style.padding = "10px 15px";
  closeButton.style.backgroundColor = "#f44336";
  closeButton.style.color = "#fff";
  closeButton.style.border = "none";
  closeButton.style.borderRadius = "5px";
  closeButton.style.cursor = "pointer";
  closeButton.onclick = () => {
    document.body.removeChild(modal);
  };

  modal.appendChild(grid);
  modal.appendChild(closeButton);
  document.body.appendChild(modal);
}

// Function to add a generation
function addGeneration() {
  const container = document.getElementById("treeContainer");
  const generationId = `generation-${treeData.length + 1}`;
  const generation = {
    id: generationId,
    members: [],
  };
  treeData.push(generation);

  const generationDiv = document.createElement("div");
  generationDiv.className = "generation";
  generationDiv.id = generationId;
  generationDiv.innerHTML = `<h3>Generation ${treeData.length}</h3>`;
  container.appendChild(generationDiv);
}

// Function to add a member to the family tree
function addMember() {
  const lastGeneration = treeData[treeData.length - 1];
  if (!lastGeneration) {
    alert("Please add a generation first.");
    return;
  }

  const name = prompt("Enter the name of the person:");
  if (!name) {
    alert("Name is required.");
    return;
  }

  selectIcon((imageUrl) => {
    const member = {
      id: `${lastGeneration.id}-member-${lastGeneration.members.length + 1}`,
      name: name,
      imageUrl: imageUrl,
    };
    lastGeneration.members.push(member);

    const generationDiv = document.getElementById(lastGeneration.id);
    const node = document.createElement("div");
    node.className = "tree-node";
    node.id = member.id;
    node.innerHTML = `
            <img src="${imageUrl}" alt="${name}">
            <p>${name}</p>
        `;
    generationDiv.appendChild(node);
  });
}

// Function to save progress to localStorage
function saveProgress() {
  localStorage.setItem(
    "familyTree",
    JSON.stringify({ treeData, relationships })
  );
  alert("Progress saved successfully!");
}

// Function to load progress from localStorage
function loadProgress() {
  const savedData = localStorage.getItem("familyTree");
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    treeData = parsedData.treeData;
    relationships = parsedData.relationships;

    const container = document.getElementById("treeContainer");
    container.innerHTML = "";
    treeData.forEach((generation) => {
      const generationDiv = document.createElement("div");
      generationDiv.className = "generation";
      generationDiv.id = generation.id;
      generationDiv.innerHTML = `<h3>${generation.id.replace(
        "generation-",
        "Generation "
      )}</h3>`;
      generation.members.forEach((member) => {
        const node = document.createElement("div");
        node.className = "tree-node";
        node.id = member.id;
        node.innerHTML = `
                    <img src="${member.imageUrl}" alt="${member.name}">
                    <p>${member.name}</p>
                `;
        generationDiv.appendChild(node);
      });
      container.appendChild(generationDiv);
    });
  }
}

// Function to download tree as JSON
function downloadTree() {
  const blob = new Blob(
    [JSON.stringify({ treeData, relationships }, null, 2)],
    { type: "application/json" }
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "family_tree.json";
  a.click();
  URL.revokeObjectURL(url);
}

// Load saved progress on page load
window.onload = loadProgress;
