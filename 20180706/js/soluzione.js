class Persona {
    static id = 0;
    constructor(nome, cognome, data) {
        Persona.id++;
        this.personId = Persona.id;
        this.nome = nome;
        this.cognome = cognome;
        this.data = data;
    }

    infoPersonaConsole() {
        console.log("Nome: " + this.nome + ", cognome: " + this.cognome + ", data di nascita: " + this.data);
    }

    infoPersonaDOM() {
        let thisPerson = this;
        let div = document.getElementsByClassName("people")[0];
        let card = document.createElement("div");
        card.className = "card";
        let h2 = document.createElement("h2");
        h2.innerHTML = this.nome + " " + this.cognome;
        let p = document.createElement("p");
        p.innerHTML = this.data + " ";
        let span = document.createElement("span");
        span.innerHTML = "x";
        span.addEventListener("click", function() {
            div.removeChild(card);
            let index = persone.indexOf(thisPerson);
            persone.splice(index);
        });

        p.appendChild(span);
        card.appendChild(h2);
        card.appendChild(p);
        div.appendChild(card);
    }
}

let persone = [];

window.onload = function() {
    let crea = document.getElementsByTagName("button")[0];

    crea.addEventListener("click", function(event) {
        event.preventDefault();
        let nome = document.getElementsByName("nome")[0].value;
        let cognome = document.getElementsByName("cognome")[0].value;
        let data = document.getElementsByName("data_nascita")[0].value;

        if(nome.length > 2 && cognome.length > 2 && data != null) {
            let persona = new Persona(nome, cognome, data);
            persona.infoPersonaConsole();
            persona.infoPersonaDOM();
            persone.push(persona);
        } else {
            alert("Errore: nome e cognome devono essere di almeno due caratteri e la data non può essere vuota");
        }
    });
}