document.addEventListener("DOMContentLoaded", function() {
    const buttonCaricaDati = document.querySelector("button");
    const paragrafo = document.querySelector("main > p");
    const tabella = document.querySelector("table");

    buttonCaricaDati.addEventListener("click", function() {
        paragrafo.textContent = "Caricamento dati in corso...";
        fetch("sw_a.json")
            .then(response => response.json())
            .then(data => {
                paragrafo.textContent = "Caricamento dei dati avvenuto con successo.";
                visualizzaDati(data);
            })
            .catch(error => console.error("Errore durante il caricamento dei dati:", error));
    });

    function visualizzaDati(data) {
        tabella.innerHTML = "";
        const intestazioni = Object.keys(data[0]);
        intestazioni.push("Azione");

        const thead = document.createElement("thead");
        const trIntestazioni = document.createElement("tr");
        intestazioni.forEach(intestazione => {
            const th = document.createElement("th");
            th.textContent = intestazione;
            trIntestazioni.appendChild(th);
        });
        thead.appendChild(trIntestazioni);
        tabella.appendChild(thead);

        const tbody = document.createElement("tbody");
        data.forEach(riga => {
            const tr = document.createElement("tr");
            intestazioni.forEach(intestazione => {
                const td = document.createElement("td");
                if (intestazione === "Azione") {
                    const buttonModifica = document.createElement("button");
                    buttonModifica.textContent = "Modifica Riga";
                    buttonModifica.addEventListener("click", function() {
                        modificaRiga(tr, riga);
                    });
                    td.appendChild(buttonModifica);
                } else {
                    td.textContent = riga[intestazione];
                }
                if (intestazione === "colore_preferito") {
                    td.style.backgroundColor = riga[intestazione];
                }
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        tabella.appendChild(tbody);
    }

    function modificaRiga(tr, riga) {
        const inputs = [];
        tr.childNodes.forEach((cella, index) => {
            if (index !== tr.childNodes.length - 1) {
                const input = document.createElement("input");
                input.type = (index === 2) ? "color" : "text";
                input.value = cella.textContent;
                cella.textContent = "";
                cella.appendChild(input);
                inputs.push(input);
            }
        });
        const buttonConferma = tr.querySelector("button");
        buttonConferma.textContent = "Conferma";
        buttonConferma.addEventListener("click", function() {
            confermaModifica(tr, inputs, riga);
        });
    }

    function confermaModifica(tr, inputs, riga) {
        inputs.forEach((input, index) => {
            const valore = (index === 2) ? input.value : input.value.trim();
            const cella = tr.childNodes[index];
            cella.textContent = valore;
            if (index === 2) {
                cella.style.backgroundColor = valore;
            }
            riga[Object.keys(riga)[index]] = valore;
        });
        const buttonModifica = tr.querySelector("button");
        buttonModifica.textContent = "Modifica Riga";
        buttonModifica.removeEventListener("click", confermaModifica);
    }
});