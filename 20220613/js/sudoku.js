window.onload = function() {
    let form = document.querySelector("form");
    let span = document.querySelectorAll("span");
    let button = document.querySelectorAll("button");

    form.hidden = true;
    console.log(span);
    span.forEach(function(s) {
        s.hidden = true;
    })

    button.forEach(function(b) {
        if (b.innerHTML == "Valuta Soluzione") {
            b.hidden = true;
        } else {
            b.addEventListener('click', function() {

            });
        }
    })
}

function createGame() {
    let request = new XMLHttpRequest();


    request.onreadystatechange = function() {
        if (this.readyState == "4" && this.status == "200") {
            let data = JSON.parse(this.responseText);
            console.log(data);
            let table = fillTable(data);
            document.querySelector("form").hidden = false;
            document.querySelectorAll("input[type=number]").forEach(function(i) {
                i.value = "";
            });
            
        }
    }

    request.open("GET", "../php/sudoku.php");
    request.send();
}

function fillTable(data) {
    
}