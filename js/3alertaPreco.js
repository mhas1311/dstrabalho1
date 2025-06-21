var usuarioLogado = null;
var usuarioCompras;
var intervalId;
var produto;
var valor;
var monitorando = false;

$(document).ready(function () {
    $("#formulario").validate({
        rules: {
            valor: {
                required: true,
            }
        },
        messages: {
            valor: {
                required: "Campo obrigatório",
            }
        }
    });
});

function carregar() {
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (localStorage.usuarioCompras) {
        usuarioCompras = JSON.parse(localStorage.getItem('usuarioCompras'));
    } else {
        usuarioCompras = [];
        localStorage.setItem('usuarioCompras', JSON.stringify(usuarioCompras));
    }

    retornaOsProdutos();

}


async function retornaOsProdutos() {
    try {
        var chave = usuarioLogado[0].chave;
        const resposta = await fetch(`https://api-odinline.odiloncorrea.com/produto/${chave}/usuario`)
        const produtos = await resposta.json();
        produtos.forEach(p => {
            carregarSelect(p);
        });
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }

}

function carregarSelect(produtos) {
    $("#produto").append(
        `<option value="${produtos.id}">${produtos.descricao}</option>`
    );
}


function iniciar() {
    if(!$("#formulario").valid()) {
        return;
    }
    var acao = $("#acao").val();
    if (acao == 1) {
        if (monitorando) {
            monitorando = false;
            clearTimeout(intervalId);
            $("#start").text("Buscar").removeClass("btn-danger").addClass("btn-success");
        } else {

            produto = $("#produto").val();
            valor = parseFloat($("#valor").val());
            monitorando = true;
            $("#start").text("Cancelar").removeClass("btn-success").addClass("btn-danger");
            iniciarTemporizador();
        }
    } else if (acao == 2) {
        //
        if (monitorando) {
            monitorando = false;
            clearTimeout(intervalId);
            $("#start").text("Buscar").removeClass("btn-danger").addClass("btn-success");
        } else {

            produto = $("#produto").val();
            valor = parseFloat($("#valor").val());
            monitorando = true;
            $("#start").text("Cancelar").removeClass("btn-success").addClass("btn-danger");
            iniciarTemporizadorCompra();
        }
    }

}

async function iniciarTemporizadorCompra() {
    if (!monitorando) return;
    clearTimeout(intervalId);
    intervalId = setTimeout(realizarCompra, 5000); // 5 segundos
}

async function iniciarTemporizador() {
    if (!monitorando) return;
    clearTimeout(intervalId);
    intervalId = setTimeout(alerta, 5000); // 5 segundos
}

async function alerta() {
    if (!monitorando) return;
    try {
        var chave = usuarioLogado[0].chave;
        const resposta = await fetch(`https://api-odinline.odiloncorrea.com/produto/${chave}/usuario`)
        const produtos = await resposta.json();

        var produtoSelecionado = produtos.find(p => p.id == produto);
        if (produtoSelecionado) {
            if (produtoSelecionado.valor <= valor) {

                Swal.fire({
                    icon: 'info',
                    title: 'OPORTUNIDADE:',
                    text: 'Produto ABAIXO ou IGUAL ao valor desejado!',
                    showCancelButton: true,
                    confirmButtonText: 'Comprar',
                    cancelButtonText: 'Continuar monitorando',
                }).then((result) => {
                    if (result.isConfirmed) {
                        monitorando = false;
                        clearTimeout(intervalId);
                        $("#start").text("Buscar").removeClass("btn-danger").addClass("btn-success");
                        alert("Comprado com sucesso!");
                        usuarioCompras.push(produtoSelecionado);
                        localStorage.setItem('usuarioCompras', JSON.stringify(usuarioCompras));
                    } else if (result.isDismissed) {
                        iniciarTemporizador();
                    }
                });
            }
            else {
                //remover depois
                alert("Produto ACIMA do valor desejado!");
            }
        } else {
            alert("Produto NÃO encontrado!");
        }

    } catch (error) {
        console.error('ERRO ao buscar produtos:', error);
    }
}

async function realizarCompra() {
    if (!monitorando) return;
    try {
        var chave = usuarioLogado[0].chave;
        const resposta = await fetch(`https://api-odinline.odiloncorrea.com/produto/${chave}/usuario`)
        const produtos = await resposta.json();

        var produtoSelecionado = produtos.find(p => p.id == produto);
        if (produtoSelecionado) {
            if (produtoSelecionado.valor <= valor) {

                Swal.fire({
                    icon: 'success',
                    title: 'ALERTA DE COMPRA:',
                    text: 'Produto COMPRADO com valor ABAIXO ou IGUAL ao desejado!',
                    confirmButtonText: 'OK',
                }).then((result) => {
                    result.isConfirmed
                    monitorando = false;
                    clearTimeout(intervalId);
                    $("#start").text("Buscar").removeClass("btn-danger").addClass("btn-success");
                    usuarioCompras.push(produtoSelecionado);
                    localStorage.setItem('usuarioCompras', JSON.stringify(usuarioCompras));
                    window.location.href = "minhasCompras.html";

                });
            }
            else {
                //remover depois
                alert("Produto ACIMA do valor desejado!");
            }
        } else {
            alert("Produto NÃO encontrado!");
        }

    } catch (error) {
        console.error('ERRO ao buscar produtos:', error);
    }
}



