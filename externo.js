//Declaração de variáveis globais
let buttonAddContato = document.querySelector('#buttonNovoContato')
let buttonCancelaContato = document.querySelector('#buttonCancelar')
let telaInicio = document.querySelector('#telaInicio')
let addContato = document.querySelector('#add-contato')
let formContato = document.querySelector('#formContato')
let InputNomeContato = document.querySelector('#nomeContato')
let InputsobrenomeContato = document.querySelector('#sobrenomeContato')
let InputNumeroContato = document.querySelector('#numeroContato')
let InputEmailContato = document.querySelector('#emailContato')
let InputObsContato = document.querySelector('#obsContato')
let divMensagemErro = document.querySelector('#mensagemErro')
let tabelaContatos = document.querySelector('#tabelaContatos')

//Criação da lista de contatos
var listaContatos = []

function removerContato(event) {
    var posicao = event.target.getAttribute('data-contato')
    listaContatos.splice(posicao, 1)
    atualizarTabelaContatos()
}

function atualizarTabelaContatos() {
    if (listaContatos.length === 0) {
        tabelaContatos.innerHTML = '<tr><td colspan="6">Nenhum contato</td></tr>'
        return
    }
    tabelaContatos.innerHTML = ''
    for (var i = 0; i < listaContatos.length; i++) {
        var contato = listaContatos[i]
        var linha = document.createElement('tr')
        var celulaNome = document.createElement('td')
        var celulaSobrenome = document.createElement('td')
        var celulaNumero = document.createElement('td')
        var celulaEmail = document.createElement('td')
        var celulaObs = document.createElement('td')
        var celulaAcoes = document.createElement('td')
        var botaoRemover = document.createElement('button')

        botaoRemover.setAttribute('data-contato', i)
        botaoRemover.classList.add('botaoDelete')
        botaoRemover.addEventListener('click', removerContato)

        celulaNome.innerText = contato.nome
        celulaSobrenome.innerText = contato.sobrenome
        celulaNumero.innerText = contato.numero
        celulaEmail.innerText = contato.email
        celulaObs.innerText = contato.observacao
        botaoRemover.innerText = 'Deletar'

        celulaAcoes.appendChild(botaoRemover)
        linha.appendChild(celulaNome)
        linha.appendChild(celulaSobrenome)
        linha.appendChild(celulaNumero)
        linha.appendChild(celulaEmail)
        linha.appendChild(celulaObs)
        linha.appendChild(celulaAcoes)
        tabelaContatos.appendChild(linha)
    }
}

//Limpando os campos de escrita e removendo a tela de Novo Contato
function limpaContato() {
    InputNomeContato.classList.remove('campoInvalido')
    InputNumeroContato.classList.remove('campoInvalido')
    divMensagemErro.classList.add('display')
    InputNomeContato.value = ''
    InputsobrenomeContato.value = ''
    InputNumeroContato.value = ''
    InputEmailContato.value = ''
    InputObsContato.value = ''
}

//Botões "Salvar", "Cancelar" e "Lista de Contatos"
buttonAddContato.addEventListener('click', function novoContato() {
    addContato.classList.remove('display')
})

function cancelaContato() {
    addContato.classList.add('display')
    limpaContato()
}
buttonCancelaContato.addEventListener('click', cancelaContato)
telaInicio.addEventListener('click', cancelaContato)

//Checando os campos "Nome" e "Email"
function validaContato(nomeContato, numeroContato) {
    var validaCampo = true
    var erro = ''
    if (nomeContato.trim().length === 0) {
        erro = 'Insira o Nome do contato!'
        InputNomeContato.classList.add('campoInvalido')
        validaCampo = false
    } else {
        InputNomeContato.classList.remove('campoInvalido')
    }
    var numeroContatoLimpo = numeroContato.trim().length
    if (numeroContatoLimpo === 0) {
        if (erro.length > 0) {
            erro += '<br>'
        }
        erro += 'Insira o número do contato!'
        InputNumeroContato.classList.add('campoInvalido')
        validaCampo = false
    } else {
        InputNumeroContato.classList.remove('campoInvalido')
    }

    if (!validaCampo) {
        divMensagemErro.innerHTML = erro
        divMensagemErro.classList.remove('display')
    } else {
        divMensagemErro.classList.add('display')
    }

    return validaCampo
}

//Transferindo os dados para a tabela em caso de sucesso
function salvarContato(event) {
    event.preventDefault()
    var nomeContato = InputNomeContato.value
    var numeroContato = InputNumeroContato.value
    if (validaContato(nomeContato, numeroContato)) {
        console.log('Contato válido')
        listaContatos.push({
            nome: nomeContato,
            numero: numeroContato,
            sobrenome: sobrenomeContato.value,
            email: emailContato.value,
            observacao: obsContato.value,
        })

        atualizarTabelaContatos()
        cancelaContato()
        alert('Contato adicionado com sucesso!')
    } else {

    }
}

formContato.addEventListener('submit', salvarContato)
window.addEventListener('load', atualizarTabelaContatos)