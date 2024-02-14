
window.onload = function() {

    let tabellone = document.getElementsByClassName("tabellone")[0];
    let tds = tabellone.getElementsByTagName("td");
    let selected = false;
    let bg = "";

    Array.from(tds).forEach(td => {
        
        td.addEventListener("click", function() {
            if (td.style.backgroundColor == bg) {
                if (selected) {
                    Array.from(tds).forEach(el => { el.style.backgroundColor = bg;});
                    selected = false;
                }
                td.style.backgroundColor = "#a9c5f2";
                selected = true;
            }
            else {
                td.style.backgroundColor = bg;
                selected = false;
            }
        })
    });

    let numeri = document.getElementById("numeri");
    let numeriTd = numeri.getElementsByTagName("td");
    let log = document.getElementsByClassName("log")[0];

    Array.from(numeriTd).forEach(td => {
        td.addEventListener("click", function() {
            if (!selected) {
                log.innerHTML = "Cella non selezionata";
            } else {
                Array.from(tds).forEach(el => {
                    if (el.style.backgroundColor != bg) {
                        el.innerHTML = td.innerHTML;
                    }
                    el.style.backgroundColor = bg;
                });
                selected = false;
                log.innerHTML = "Numero inserito correttamente";
            }
        })
    })
}