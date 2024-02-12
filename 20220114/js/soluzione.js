const oneColor = "red";
const twoColor = "blue";
const rows = 6;
const cols = 7;
let matrix = [];

window.onload = function() {

    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
        for (let j = 0; j < cols; j++) {
            matrix[i][j] = Math.floor(Math.random() * 10) % 2 + 1;
        }
    }

    let table = document.getElementsByTagName("table")[0];
    let tableColor = table.style.backgroundColor;

    for (let i = 0; i < matrix.length; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < matrix[i].length; j++) {
            let cell = document.createElement("td");
            cell.style.backgroundColor = matrix[i][j] == 1 ? oneColor : twoColor;
            cell.addEventListener('click', function(e) {
                e.target.style.backgroundColor = tableColor;
                matrix[i][j] = 0;
            });
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    let generaButton = document.getElementsByTagName("button")[0];

    generaButton.addEventListener('click', function() {
        let copia = document.getElementsByClassName("copia")[0].children[0];
        copia.innerHTML = "";

        for (let i = 0; i < matrix.length; i++) {
            let row = document.createElement("tr");
            for (let j = 0; j < matrix[i].length; j++) {
                let cell = document.createElement("td");

                if (matrix[i][j] == 1) {
                    cell.style.backgroundColor = oneColor;
                } else if (matrix[i][j] == 2) {
                    cell.style.backgroundColor = twoColor;
                } else {
                    cell.style.backgroundColor = tableColor;
                }
                
                row.appendChild(cell);
            }
            copia.appendChild(row);
        }
    })

    console.log(matrix);
}