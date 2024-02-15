class Rettangolo {
    constructor(base, altezza) {
        this.base = base;
        this.altezza = altezza;
    }

    stampaInConsole() {
        let perimetro = (this.base + this.altezza) * 2;
        let area = this.base * this.altezza;

        console.log("Base: " + this.base + ", Altezza:  " + this.altezza +
            ", Perimetro: " + perimetro + ", Area: " + area);
    }

    visualizzaNelDOM(selettore) {
        let element = document.querySelector(selettore);

        let div = document.createElement("div");
        div.style.border = "1px solid black";
        div.style.height = this.altezza + "px";
        div.style.width = this.base + "px";
        let link = document.createElement("a");
        link.textContent = "x";
        link.addEventListener("click", function() {
            element.removeChild(div);
        });
        div.appendChild(link);
        element.appendChild(div);
    }
}


window.onload = function() {
    let genera = document.getElementsByTagName("button")[0];
    
    genera.addEventListener("click", function() {
        let base = document.getElementsByName("base")[0].value;
        let altezza = document.getElementsByName("altezza")[0].value;

        let rectangle = new Rettangolo(base, altezza);
        rectangle.stampaInConsole();

        rectangle.visualizzaNelDOM("button + div");

    });
}