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
    const npcs
