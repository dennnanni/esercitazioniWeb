window.onload = function() {

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == "4" && xhttp.status == "200") {
            console.log(xhttp.responseText);
            let data = JSON.parse(xhttp.responseText);

            let table = document.createElement("table");
            let tr = document.createElement("tr");
            for(header in data[0]) {
                let th = document.createElement("th");
                th.textContent = header;
                tr.appendChild(th);
            }

            table.appendChild(tr);

            for(row of data) {
                tr = document.createElement("tr");
                for(value in row) {
                    let td = document.createElement("td");
                    td.textContent = row[value];
                    tr.appendChild(td);
                }
                table.appendChild(tr);
            }

            document.querySelector(".table").appendChild(table);
        }
    }

    xhttp.open("GET", "../php/index.php");
    xhttp.send();


    let aggiungi = document.querySelector("#btnSubmit");

    aggiungi.addEventListener("click", function(e) {
        e.preventDefault();

        let nome = document.querySelector("#name").value;
        let peso = document.querySelector("#mass").value;
        let altezza = document.querySelector("#height").value;

        if(nome.length > 0 && peso != null && altezza != null) {

            let form = document.querySelector("form");
            form.submit();

        }
    })
}