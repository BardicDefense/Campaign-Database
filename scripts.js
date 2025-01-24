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

function saveToFile() {
    const npcs = JSON.parse(localStorage.getItem('npcs')) || [];
    let htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>NPCs</title>
        <style>
            body { font-family: Arial, sans-serif; }
            .npc-item { cursor: pointer; }
        </style>
    </head>
    <body>
        <h1>NPC List</h1>
        <div class="npc-list">
            <ul>`;

    npcs.forEach(npc => {
        htmlContent += `<li><strong>Name:</strong> <input type="text" value="${npc.name}" /> <strong>Location:</strong> <input type="text" value="${npc.location}" /> <strong>Description:</strong> <input type="text" value="${npc.description}" /></li>`;
    });

    htmlContent += `</ul>
        </div>
        <button onclick="saveChanges()">Save Changes</button>
        <script>
            function saveChanges() {
                const inputs = document.querySelectorAll('.npc-list input');
                const newNpcs = [];
                for (let i = 0; i < inputs.length; i += 3) {
                    newNpcs.push({
                        name: inputs[i].value,
                        location: inputs[i + 1].value,
                        description: inputs[i + 2].value
                    });
                }
                const newHtmlContent = \`<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>NPCs</title>
                </head>
                <body>
                    <h1>NPC List</h1>
                    <ul>\${newNpcs.map(npc => \`<li><strong>Name:</strong> \${npc.name}, <strong>Location:</strong> \${npc.location}, <strong>Description:</strong> \${npc.description}</li>\`).join('')}</ul>
                    <button onclick="window.close()">Close</button>
                </body>
                </html>\`;
                const blob = new Blob([newHtmlContent], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'npcs.html'; // The name of the file to be downloaded
                document.body.appendChild(a);
                a.click(); // Programmatically click the link to trigger the download
                document.body.removeChild(a); // Clean up
                URL.revokeObjectURL(url); // Free up memory
            }
        </script>
    </body>
    </html>`;

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
