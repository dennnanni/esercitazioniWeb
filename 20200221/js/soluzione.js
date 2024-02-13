function rgb2hex(orig){
    let rgb = orig.replace(/\s/g,'').match(/^rgba?\((\d+),(\d+),(\d+)/i);
    return (rgb && rgb.length === 4) ? "#" +
     ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
     ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
     ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : orig;
}


window.onload = function() {
    let caricadati = document.getElementsByTagName("button")[0];

    caricadati.addEventListener('click', function() {
        let paragraph = document.getElementsByTagName("p")[0];
        paragraph.innerHTML = "Caricamento dati in corso...";

        let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == "4" && xhttp.status == "200") {
                let data = JSON.parse(xhttp.responseText);
                let table = document.getElementsByTagName("table")[0];
                
                table.appendChild(createHeaderRow(data[0]));

                for (let element of data) {
                    table.appendChild(createRow(element));
                }


                paragraph.innerHTML = "Caricamento dati avvenuto con successo.";
            }
        };

        xhttp.open("GET", "sw_a.json");
        xhttp.send();
    });
}

function createHeaderRow(data) {
    let row = document.createElement("tr");

    for (const key in data) {
        let element = document.createElement("th");
        element.innerHTML = key;
        row.appendChild(element);
    }

    let element = document.createElement("th");
    element.innerHTML = "Azione";
    row.appendChild(element);

    return row;
}

function createRow(data) {
    let row = document.createElement("tr");

    for (const key in data) {
        let element = document.createElement("td");
        if (data[key].indexOf("#") == 0 && data[key].length == 7) {
            element.style.backgroundColor = data[key];
        } else {
            element.innerHTML = data[key];
        }
        row.appendChild(element);
    }

    let element = document.createElement("td");
    let button = document.createElement("button");
    button.id = "modifica" + data.nome;
    button.name = "modifica";
    button.innerHTML = "Modifica riga";
    button.addEventListener('click', function(e) {
        let thisB = e.target;
        if (thisB.innerHTML == "Modifica riga") {
            thisB.innerHTML = "Conferma";
            set(row);
        } else {
            thisB.innerHTML = "Modifica riga";
        }
    });
    element.appendChild(button);
    row.appendChild(element);

    return row;
}

function set(row) {
    let tds = row.querySelectorAll("td");

    tds.forEach(element => {
        let input = document.createElement("input");
        if (element.innerHTML.indexOf("@") > -1) {
            input = ;
            input.type = "email";
            input.id = ""
        }
    });
}
