var usuarioLogado = [];

function carregar() {
    localStorage.clear();
    var dados = localStorage.getItem('usuarioLogado');
    if (dados) {
        usuarioLogado = JSON.parse(dados);
    } else {
        usuarioLogado = [];
    }
}

$(document).ready(function () {
    $("#formulario").validate({
        rules: {
            login: {
                required: true,
                minlength: 3
            },
            senha: {
                required: true,
                minlength: 3
            }
        },
        messages: {
            login: {
                required: "Campo obrigatório",
                minlength: "Verifique o preenchimento"
            },
            senha: {
                required: "Campo obrigatório",
                minlength: "Verifique o preenchimento"
            }
        }
    });
});

async function recuperarDados(login, senha) {
    try {
        var resposta = await fetch("https://api-odinline.odiloncorrea.com/usuario/" + login + "/" + senha + "/autenticar");

        // Verifica se a resposta foi bem-sucedida
        if (!resposta.ok) {
            throw new Error('Falha na autenticação');
        }

        var usuario = await resposta.json();

        // Verifica se o usuário retornado é válido
        if (!usuario || !usuario.id) { // Ajuste conforme o formato esperado da API
            throw new Error('Usuário ou senha inválidos');
        }

        usuarioLogado.push(usuario);
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
        alert('Login realizado com sucesso');
        window.location.href = "acesso.html";

    } catch (erro) {
        console.error('Erro na requisição:', erro);
        alert('Usuario ou senha inválidos');
    }



}






function autenticar() {
    var login = $("#login").val();
    var senha = $("#senha").val();

    if ($("#formulario").valid()) {
        recuperarDados(login, senha);
    }


}