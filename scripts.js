const npcListElement = document.getElementById('npcList');

// Load NPCs from local storage
function loadNPCs() {
    const npcs = JSON.parse(localStorage.getItem('npcs')) || [];
    displayNPCs(npcs);
}

// Display NPCs in the list
function displayNPCs(npcs) {
    npcListElement.innerHTML = '';
    npcs.forEach(npc => {
        const npcItem = document.createElement('div');
        npcItem.className = 'npc-item';
        npcItem.innerText = `${npc.name} - ${npc.location}`;
        npcItem.onclick = () => editNPC(npc);
        npcListElement.appendChild(npcItem);
    });
}

// Function to add a new NPC
function addNPC() {
    const newNPC = {
        id: Date.now(),
        name: prompt("Enter NPC Name:"),
        location: prompt("Enter NPC Location:"),
        description: prompt("Enter NPC Description:")
    };
    const npcs = JSON.parse(localStorage.getItem('npcs')) || [];
    npcs.push(newNPC);
    localStorage.setItem('npcs', JSON.stringify(npcs));
    loadNPCs();
}

// Function to edit an NPC
function editNPC(npc) {
    const npcs = JSON.parse(localStorage.getItem('npcs')) || [];
    const index = npcs.findIndex(item => item.id === npc.id);
    if (index !== -1) {
        npcs[index].name = prompt("Edit NPC Name:", npc.name) || npc.name;
        npcs[index].location = prompt("Edit NPC Location:", npc.location) || npc.location;
        npcs[index].description = prompt("Edit NPC Description:", npc.description) || npc.description;
        localStorage.setItem('npcs', JSON.stringify(npcs));
        loadNPCs();
    }
}

// Function to save NPCs to an HTML file
function saveToFile() {
    const npcs = JSON.parse(localStorage.getItem('npcs')) || [];
    let htmlContent = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>NPCs</title></head><body>';
    htmlContent += '<h1>NPC List</h1><ul>';

    npcs.forEach(npc => {
        htmlContent += `<li><strong>Name:</strong> ${npc.name}, <strong>Location:</strong> ${npc.location}, <strong>Description:</strong> ${npc.description}</li>`;
    });

    htmlContent += '</ul></body></html>';

    // Create a Blob from the HTML string
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    // Create a link element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'npcs.html'; // The name of the file to be downloaded
    document.body.appendChild(a);
    a.click(); // Programmatically click the link to trigger the download
    document.body.removeChild(a); // Clean up
    URL.revokeObjectURL(url); // Free up memory
}

// Load NPCs on page load
window.onload = loadNPCs;
