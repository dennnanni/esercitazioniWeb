const defaultColor = "white";
const selectColor = "red";

window.onload = function() {
    let insertButton = document.getElementsByClassName("insert")[0];
    let resetButton = document.getElementsByTagName("button")[1];

    insertButton.addEventListener('click', function() {
        let input = document.getElementsByName("numero")[0].value;
        let tableRows = document.getElementsByTagName("tr");

        for (row of tableRows) {
            let childrenNumber = row.children.length;
            if (input <= childrenNumber) {
                input = parseInt(input) + 1;
                let td = row.querySelector("td:nth-child(" + input + ")");
                td.style.backgroundColor = selectColor;
                break;
            } else {
                input -= childrenNumber;
            }
        }
    });

    resetButton.addEventListener('click', function() {
        let tds = document.querySelectorAll("td");
        tds.forEach(function(td) {
            td.style.backgroundColor = defaultColor;
        })
    });
}