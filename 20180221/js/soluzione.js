window.onload = function() {
    document.querySelectorAll("span").forEach(element => {
        element.hidden = true;
    });

    let rows = document.getElementsByTagName("tr");
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let array = [];
    let i = 0, j = 0;
    let correct = true;
    
    Array.from(rows).forEach(tr => {
        array[i] = [];
        let tds = tr.getElementsByTagName("td");
        Array.from(tds).forEach(td => {
            array[i][j] = parseInt(td.textContent);
            j++;
        })
        i++;
        j = 0;
        
    })

    array.forEach(row => {
        let values = [];
        row.forEach(value => {
            if (values.indexOf(value) == -1) {
                values.push(value);
            }
        })
        
        if (values.length != 9) {
            correct = false;
        }
    })

    for(j = 0; j < 9; j++) {
        let values = [];
        for(i = 0; i < 9; i++) {
            if (values.indexOf(array[i][j]) == -1) {
                values.push(array[i][j]);
            }
        }

        if (values.length != 9) {
            correct = false;
            break;
        }
    }

    for(i = 0; i < 9; i += 3) {
        for(j = 0; j < 9; j += 3) {
            let values = [];

            for (let ii = 0; ii < 3; ii++) {
                for(let jj = 0; jj < 3; jj++) {
                    if (values.indexOf(array[ii][jj]) == -1) {
                        values.push(array[ii][jj]);
                    }
                }
            }

            if (values.length != 9) {
                correct = false;
                break;
            }
        }
    }

    if (correct) {
        document.querySelector(".win").hidden = false;
    } else {
        document.querySelector("#lose").hidden = false;
    }

}