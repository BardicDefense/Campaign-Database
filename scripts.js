const npcListElement = document.getElementById('npcList');

// Load NPCs from JSON file
async function loadNPCs() {
    const response = await fetch('npcs.json');
    const npcs = await response.json();
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
        id: Date.now(), // Simple unique ID
        name: prompt("Enter NPC Name:"),
        location: prompt("Enter NPC Location:"),
        description: prompt("Enter NPC Description:")
    };
    // Here you would normally save the new NPC to your JSON file
    // For simplicity, we will just reload the NPCs
    loadNPCs();
}

// Function to edit an NPC
function editNPC(npc) {
    const newName = prompt("Edit NPC Name:", npc.name);
    const newLocation = prompt("Edit NPC Location:", npc.location);
    const newDescription = prompt("Edit NPC Description:", npc.description);
    // Here you would normally update the NPC in your JSON file
    // For simplicity, we will just reload the NPCs
    loadNPCs();
}

// Load NPCs on page load
window.onload = loadNPCs;
