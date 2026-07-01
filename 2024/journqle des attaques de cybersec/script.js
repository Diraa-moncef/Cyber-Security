document.getElementById("attack-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const type = document.getElementById("attack-type").value;
    const severity = document.getElementById("severity").value;
    const status = document.getElementById("status").value;
    const description = document.getElementById("description").value;

    const tableBody = document.getElementById("attack-table-body");

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${type}</td>
        <td>${severity}</td>
        <td>${status}</td>
        <td>${description}</td>
        <td><button class="delete-btn">Supprimer</button></td>
    `;

    tableBody.appendChild(row);

    row.querySelector(".delete-btn").addEventListener("click", function() {
        tableBody.removeChild(row);
    });

    this.reset();
});