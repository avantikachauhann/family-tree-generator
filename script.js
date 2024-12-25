const iconOptions = [
    'icons/1',
    'https://png.pngtree.com/png-clipart/20231008/ourmid/pngtree-happy-grandmother-cute-image-png-image_10196472.png',
    'https://www.pngmart.com/files/22/Father-PNG-Image.png',
    'https://cdn0.iconfinder.com/data/icons/mother-s-day-bzzricon-filled-lines/512/01_Mother-1024.png',
    'https://cdn-icons-png.flaticon.com/512/4842/4842291.png',
    'https://cdn-icons-png.flaticon.com/256/7223/7223727.png',
    'https://cdn-icons-png.flaticon.com/512/145/145867.png',
    'https://cdn-icons-png.flaticon.com/512/186/186037.png',
    'https://www.pngrepo.com/png/110198/512/boy.png',
    'https://cdn-icons-png.flaticon.com/512/163/163824.png'
];

let treeData = [];
let relationships = [];

function addGeneration() {
    const container = document.getElementById('treeContainer');
    const generationId = `generation-${treeData.length + 1}`;
    const generation = {
        id: generationId,
        members: []
    };
    treeData.push(generation);

    const generationDiv = document.createElement('div');
    generationDiv.className = 'generation';
    generationDiv.id = generationId;
    generationDiv.innerHTML = `<h3>Generation ${treeData.length}</h3>`;
    container.appendChild(generationDiv);
}

function selectIcon(callback) {
    const selectionDiv = document.createElement('div');
    selectionDiv.className = 'icon-selection';
    document.body.appendChild(selectionDiv);

    iconOptions.forEach((icon, index) => {
        const img = document.createElement('img');
        img.src = icon;
        img.alt = `Icon ${index + 1}`;
        img.onclick = () => {
            document.querySelectorAll('.icon-selection img').forEach(img => img.classList.remove('selected'));
            img.classList.add('selected');
            callback(icon);
            document.body.removeChild(selectionDiv);
        };
        selectionDiv.appendChild(img);
    });
}

function addMember() {
    const lastGeneration = treeData[treeData.length - 1];
    if (!lastGeneration) {
        alert('Please add a generation first.');
        return;
    }

    const name = prompt('Enter the name of the person:');
    if (!name) {
        alert('Name is required.');
        return;
    }

    selectIcon((imageUrl) => {
        const member = {
            id: `${lastGeneration.id}-member-${lastGeneration.members.length + 1}`,
            name: name,
            imageUrl: imageUrl
        };
        lastGeneration.members.push(member);

        const generationDiv = document.getElementById(lastGeneration.id);
        const node = document.createElement('div');
        node.className = 'tree-node';
        node.id = member.id;
        node.innerHTML = `
            <img src="${imageUrl}" alt="${name}">
            <p>${name}</p>
        `;
        generationDiv.appendChild(node);
    });
}

function addRelationship() {
    const memberDropdown1 = createDropdown('Select the first member:', 'member1Dropdown');
    const memberDropdown2 = createDropdown('Select the second member:', 'member2Dropdown');

    const members = treeData.flatMap(generation => generation.members);
    members.forEach(member => {
        const option1 = document.createElement('option');
        option1.value = member.id;
        option1.textContent = member.name;
        memberDropdown1.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = member.id;
        option2.textContent = member.name;
        memberDropdown2.appendChild(option2);
    });

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Add Relationship';
    submitButton.className = 'button';
    submitButton.onclick = () => {
        const member1Id = memberDropdown1.value;
        const member2Id = memberDropdown2.value;

        if (!member1Id || !member2Id) {
            alert('Please select both members.');
            return;
        }

        const member1 = document.getElementById(member1Id);
        const member2 = document.getElementById(member2Id);

        if (!member1 || !member2) {
            alert('Invalid member IDs provided.');
            return;
        }

        relationships.push({ member1Id, member2Id });

        const line = document.createElement('div');
        line.className = 'relationship-line';
        member1.appendChild(line);

        document.body.removeChild(memberDropdown1.parentElement);
    };

    const container = document.createElement('div');
    container.appendChild(memberDropdown1);
    container.appendChild(memberDropdown2);
    container.appendChild(submitButton);
    document.body.appendChild(container);
}

function createDropdown(labelText, id) {
    const label = document.createElement('label');
    label.textContent = labelText;
    label.style.display = 'block';

    const select = document.createElement('select');
    select.id = id;

    const container = document.createElement('div');
    container.style.margin = '10px';
    container.appendChild(label);
    container.appendChild(select);

    return select;
}

function saveProgress() {
    localStorage.setItem('familyTree', JSON.stringify({ treeData, relationships }));
    alert('Progress saved successfully!');
}

function loadProgress() {
    const savedData = localStorage.getItem('familyTree');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        treeData = parsedData.treeData;
        relationships = parsedData.relationships;

        const container = document.getElementById('treeContainer');
        container.innerHTML = '';
        treeData.forEach(generation => {
            const generationDiv = document.createElement('div');
            generationDiv.className = 'generation';
            generationDiv.id = generation.id;
            generationDiv.innerHTML = `<h3>${generation.id.replace('generation-', 'Generation ')}</h3>`;
            generation.members.forEach(member => {
                const node = document.createElement('div');
                node.className = 'tree-node';
                node.id = member.id;
                node.innerHTML = `
                    <img src="${member.imageUrl}" alt="${member.name}">
                    <p>${member.name}</p>
                `;
                generationDiv.appendChild(node);
            });
            container.appendChild(generationDiv);
        });

        relationships.forEach(({ member1Id, member2Id }) => {
            const member1 = document.getElementById(member1Id);
            const member2 = document.getElementById(member2Id);
            if (member1 && member2) {
                const line = document.createElement('div');
                line.className = 'relationship-line';
                member1.appendChild(line);
            }
        });
    }
}

function downloadTree() {
    const blob = new Blob([JSON.stringify({ treeData, relationships }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'family_tree.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Load saved progress on page load
window.onload = loadProgress;