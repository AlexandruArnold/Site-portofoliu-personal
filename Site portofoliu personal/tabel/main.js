class Produs {
    constructor(id, nume, pret, cantitate) {
        this.id = id;
        this.nume = nume;
        this.pret = pret;
        this.cantitate = cantitate;
    }
}
let produse = [];
let listaProduse = localStorage.getItem("stoc");
if (listaProduse != null) {
    produse = JSON.parse(listaProduse);
}

document.getElementById("save").addEventListener("click", function() {
    let produs = new Produs(
        produse.length,
        document.getElementById("produs").value,
        document.getElementById("pret").value,
        document.getElementById("cant").value
    );
    produse.push(produs);
    localStorage.setItem("stoc", JSON.stringify(produse));
    // localStorage.stoc = JSON.stringify(produse);
    drawTable(produse);
});

function drawTable(listaProduse) {
    const tabelProduse = document.getElementById("tabelProduse");
    tabelProduse.innerHTML = "";
    tabelProduse.innerHTML = "<tr><th>Nume produs</th><th>Pret produs</th><th>Cantitate</th></tr>";
    listaProduse.forEach(element => {
        tabelProduse.innerHTML += `<tr><td>${element.nume}</td><td>${element.pret}</td><td>${element.cantitate}</td></tr>`
    });
}

drawTable(produse);