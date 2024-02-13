const caricaDati = () => {
    // Aggiornamento del paragrafo
    const paragrafo = document.querySelector('p');
    paragrafo.textContent = 'Caricamento dati in corso...';

    // Lettura del file JSON
    fetch('sw_a.json')
        .then(response => response.json())
        .then(data => {
            // Creazione della tabella
            const tabella = document.querySelector('table');
            const intestazione = tabella.createTHead();
            const rigaIntestazione = intestazione.insertRow();
            const corpoTabella = tabella.createTBody();

            // Creazione dell'intestazione
            for (const chiave in data[0]) {
                const cellaIntestazione = rigaIntestazione.insertCell();
                cellaIntestazione.textContent = chiave;
            }

            // Aggiunta di una colonna "Azione"
            const cellaAzioneIntestazione = rigaIntestazione.insertCell();
            cellaAzioneIntestazione.textContent = 'Azione';

            // Inserimento dei dati
            for (const personaggio of data) {
                const riga = corpoTabella.insertRow();
                for (const chiave in personaggio) {
                    const cella = riga.insertCell();
                    if (chiave === 'colore_preferito') {
                        cella.style.backgroundColor = personaggio[chiave];
                    } else {
                        cella.textContent = personaggio[chiave];
                    }
                }

                // Aggiunta del pulsante "Modifica Riga"
                const cellaAzione = riga.insertCell();
                const pulsanteModifica = document.createElement('button');
                pulsanteModifica.textContent = 'Modifica Riga';
                pulsanteModifica.addEventListener('click', modificaRiga);
                cellaAzione.appendChild(pulsanteModifica);
            }

            // Aggiornamento del paragrafo
            paragrafo.textContent = 'Caricamento dei dati avvenuto con successo.';
        });
};

const modificaRiga = (evento) => {
    const pulsante = evento.target;
    const riga = pulsante.parentNode.parentNode;
    const celle = riga.querySelectorAll('td');

    // Sostituzione dei testi con i campi di input
    for (let i = 0; i < celle.length - 1; i++) {
        const cella = celle[i];
        const valore = cella.textContent;
        let input;
        if (i === 1) {
            // Email
            input = document.createElement('input');
            input.type = 'email';
            input.value = valore;
        } else if (i === 2) {
            // Colore preferito
            input = document.createElement('input');
            input.type = 'color';
            input.value = valore;
        } else {
            // Testo semplice
            input = document.createElement('input');
            input.type = 'text';
            input.value = valore;
        }
        cella.textContent = '';
        cella.appendChild(input);
    }

    // Modifica del testo del pulsante
    pulsante.textContent = 'Conferma';

    // Aggiunta dell'evento di conferma
    pulsante.addEventListener('click', confermaModifica);
};

const confermaModifica = (evento) => {
    const pulsante = evento.target;
    const riga = pulsante.parentNode.parentNode;
    const celle = riga.querySelectorAll('td');
    const dati = [];

    // Lettura dei valori dai campi di input
    for (let i = 0; i < celle.length - 1; i++) {
        const cella = celle[i];
        const input = cella.querySelector('input');
        dati.push(input.value);
    }

    // Aggiornamento dei dati nella riga
    for (let i = 0; i < dati.length; i++) {
        const cella = celle[i];
        if (i === 2) {
            // Colore preferito
            cella.style.backgroundColor = dati[i];
        } else {
            cella.textContent = dati[i];
        }
    }

    // Modifica del testo del pulsante
    pulsante.textContent = 'Modifica Riga';

    // Rimozione dell'evento di conferma
    pulsante.removeEventListener('click', confermaModifica);
};

// Assegnazione dell'evento al pulsante
document.getElementsByTagName('button')[0].addEventListener('click', caricaDati);


//
