function sortTable(columnIndex) {
    const table = document.getElementById("myTable");
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.rows);
    const isAscending = table.dataset.sortOrder === "asc";
    table.dataset.sortOrder = isAscending ? "desc" : "asc";

    rows.sort((a, b) => {
        const cellA = a.cells[columnIndex].innerText.toLowerCase();
        const cellB = b.cells[columnIndex].innerText.toLowerCase();

        if (cellA < cellB) {
            return isAscending ? -1 : 1;
        }
        if (cellA > cellB) {
            return isAscending ? 1 : -1;
        }
        return 0;
    });

    rows.forEach(row => tbody.appendChild(row));
}

document.getElementById("tableSearch").addEventListener("input", function() {
    const filter = this.value.toLowerCase();
    const tbody = document.querySelector("#myTable tbody");
    const rows = Array.from(tbody.rows);
    const matchingRows = [];
    const nonMatchingRows = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        let match = false;

        cells.forEach(cell => {
            if (cell.innerText.toLowerCase().includes(filter)) {
                match = true;
            }
        });

        if (match) {
            matchingRows.push(row);
        } else {
            nonMatchingRows.push(row);
        }
    });

    // Clear the table body
    tbody.innerHTML = "";

    // Append matching rows first, then non-matching rows
    matchingRows.forEach(row => tbody.appendChild(row));
    nonMatchingRows.forEach(row => tbody.appendChild(row));
});

function displayInfo(row) {
    const infoDisplay = document.getElementById("infoDisplay");
    const cells = row.querySelectorAll("td");
    let infoHtml = "<h3>Details</h3>";

    cells.forEach(cell => {
        const label = cell.getAttribute("data-label");
        const value = cell.innerText;
        infoHtml += `<p><strong>${label}:</strong> ${value}</p>`;
    });

    infoDisplay.innerHTML = infoHtml;
    infoDisplay.style.display = "block";
}
