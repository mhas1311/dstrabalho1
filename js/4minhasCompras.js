function carregar() {
    if (!localStorage.usuarioCompras) {
        usuarioCompras = [];
        localStorage.setItem('usuarioCompras', JSON.stringify(usuarioCompras));
    }

    exibirTabela();
}


function exibirTabela() {
    var compras = JSON.parse(localStorage.getItem('usuarioCompras'));

    var tabela = $("#tabela");
    apagarLinhas(tabela);
    compras.forEach(compra => {
        adicionarLinha(tabela, compra);
    });
}

function apagarLinhas(tabela) {
    // Seleciona o corpo da tabela 
    var corpoTabela = $(tabela).find("tbody");

    corpoTabela.empty(); // Remove todas as linhas do corpo da tabela

}

function adicionarLinha(tabela, compra) {
    var corpoTabela = $(tabela).find("tbody");

    var novaLinha = $("<tr></tr>");

    var colunaProduto = $("<td></td>").text(compra.descricao);
    colunaProduto.appendTo(novaLinha);

    var colunaValor = $("<td></td>").text(compra.valor);
    colunaValor.appendTo(novaLinha);

    var colunaVisualizar = $("<td></td>").addClass("d-flex justify-content-end");
    var visualizar = $("<button></button>").text("Visualizar").addClass("btn btn-primary").attr("id", compra.id).attr("onclick", "visualizarProduto(this.id)");
    visualizar.appendTo(colunaVisualizar);
    colunaVisualizar.appendTo(novaLinha);

    novaLinha.appendTo(corpoTabela);

}


function visualizarProduto(id) {
    var compras = JSON.parse(localStorage.getItem('usuarioCompras'));
    var produto = compras.find(compra => compra.id == id);

    var janelaFlutuante = $("#janelaFlutuante");


    if (produto) {
        janelaFlutuante.find("h1").text(produto.descricao);
        $("#espacoImg").attr("src", produto.urlImagem).attr("style", "width: 30%;");
        janelaFlutuante.css("display", "flex");
    } else {
        alert("Produto não encontrado.");
    }
}


function fecharJanelaFlutuante() {
    var janelaFlutuante = $("#janelaFlutuante");
    janelaFlutuante.css("display", "none");
    janelaFlutuante.find("h1").text("");
    janelaFlutuante.find("img").attr("src", "").attr("style", "width: 0;");
}
