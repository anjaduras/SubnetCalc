function displaySubnetsTable(subnets) {
    const subnetsDisplay = document.getElementById('subnetsDisplay');

    // Clear previous output
    subnetsDisplay.innerHTML = '';

    // Create the table
    const table = document.createElement('table');
    table.classList.add('table', 'is-bordered', 'is-striped', 'is-hoverable');

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Subnet', 'Network Address', 'Broadcast Address', 'First Usable', 'Last Usable', 'Range'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    subnets.forEach(subnet => {
        const row = document.createElement('tr');

        Object.values(subnet).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            row.appendChild(td);
        });

        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    // Append the table to the display div
    subnetsDisplay.appendChild(table);
}
