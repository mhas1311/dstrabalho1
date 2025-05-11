function carregar(){
    var usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    $("#usuario").text(usuarioLogado[0].login);
}

function alerta(){
    window.location.href = "alertaPreco.html";
}

function compras(){
    window.location.href = "minhasCompras.html";
}

