//Criar Combobox
function metodoConstrutor(urlApi, labelApi, controleApi, objName, objConteiner) { 

     //Pegando URL API 
     var url = urlApi;
    //Atribuindo conteudo do HTML em uma variavel para JS
    const postsContainer = document.querySelector("#"+objConteiner);


//Função gera campos da API
async function getAllPosts(labelName, objTipo) {

    const response = await fetch(url);
    const data = await response.json();

    //Label
    const labelCurso = document.createElement("label");
    labelCurso.innerText = labelName;

    //Combobox
    const comboboxAlunoCruso = document.createElement("select")
    comboboxAlunoCruso.classList.add("form-control");
    comboboxAlunoCruso.setAttribute("name", objName);

    //Listar objtos
    data.map((item) => {

        //Criando um div
        const div = document.createElement("div");
        
        //------------------------Criando objeto Combobox
        if (objTipo == 'cb') {

            //Criando items
            const option = document.createElement("option");
            option.classList.add("form-control");


            if (objConteiner == "comboboxCurso") {
                option.setAttribute("name", item.idCurso);
                option.setAttribute("value", item.nomeCurso);
                option.innerText = item.nomeCurso;
            }
            if (objConteiner == "comboboxPeriodo") {
                option.setAttribute("name", item.idPeriodo);
                option.setAttribute("value", item.nomePeriodo);
                option.innerText = item.nomePeriodo;
            }
            if (objConteiner == "comboboxProfessor") {
                option.setAttribute("name", item.idProfessor);
                option.setAttribute("value", item.nomeProfessor);
                option.innerText = item.nomeProfessor;
            }

            comboboxAlunoCruso.appendChild(option);

            //Adicionando na DIV onde vai aparecer
            div.appendChild(labelCurso);
            div.appendChild(comboboxAlunoCruso);
        }
        //-------------------------------------------------

        postsContainer.appendChild(div);

    });

  }

    getAllPosts(labelApi, controleApi);

}

//Criar Gride
async function tabelaCriar(objConteinerTabela, urlTabela, paginacaoTabela) {

    var root = document.getElementById(objConteinerTabela);

    var response = await fetch(urlTabela);
    var data = await response.json();


    var paginacao = paginacaoTabela;

    if (paginacao == null) {

        paginacao = 1;
    }

    var rodapeTabela = `
    <div class="alinhaPaginacao" id="PaginacaoGride">
       <a class="btn btn-danger" onclick="paginacaoTabela(${paginacao},-1,${data.length})">Voltar </a>
       <a class="btn btn-primary" id="idPaginacao">${paginacao} </a>   
       <a class="btn btn-danger" onclick="paginacaoTabela(${paginacao},1,${data.length})">Avançar </a>
    </div>
`;

    //Função para paginação




    //Lista de itens Utilizando a função para delimitar
    const listaItemObj =
        await listItems(data, paginacao, 5);

    //Criação das rows da tabela
    var bodyTabela = listaItemObj.map((item) => {

        return `<tr>
                        <td>
                        <input type="checkbox" class="custom-control-input">
                        </td>
                        <td>${item.idAluno}</td>
                        <td>${item.nomeAluno}</td>
                        <td>${item.cpfAluno}</td>
                        <td>${item.celularAluno}</td>
                      </tr>`;
    }).join('');

    var buscarMenu = 
            `<div id="MenuBuscarAluno">
            <div class="col-md-6">
            <label>Aluno</label>
            <input type="text" class="form-control" id="nomeAlunoBuscar"> 
            </div>
            <div class="botoes">
            <a  class="btn btn-primary" onclick="buscarPorNome()">Buscar </a>
            <a  class="btn btn btn-danger" onclick="limpar()">Limpar </a>
            </div>
            </div>
             `;

    var tabela = `
            ${buscarMenu}
            <table class="table" id="tabelaAluno">
            <thead class="thead-dark">
                <tr>
                        <th scope="col">Selecionar</th>
                        <th scope="col">ID</th>
                        <th scope="col">Nome</th>
                        <th scope="col">CPF</th>
                        <th scope="col">Celular</th>
                </tr>
             </thead>
                  <tbody>
                        ${bodyTabela} 
                </tbody>
            </table>
                ${rodapeTabela}
             `;


    root.insertAdjacentHTML('afterbegin', tabela);
}

//Buscar itens gride por nome
async function buscarPorNome() {


 var nomeBuscar = document.querySelector("#nomeAlunoBuscar");

    if (nomeBuscar.value != "") {

        var tabelaRem = document.getElementById("tabelaAluno");
        var menuRem = document.getElementById("MenuBuscarAluno");
        var paginacao = document.getElementById("PaginacaoGride");

        tabelaRem.remove();
        menuRem.remove();
        paginacao.remove();

        document.getElementById("divLoading").style.display = "block";
        //não está funcionado
        tabelaCriar("tabelaAlunoBuscar", "BuscarAlunosPorNomeFK/?nomeAluno=" + nomeBuscar.value, null);

        document.getElementById("divLoading").style.display = "none";

    } else {

        var tabelaRem = document.getElementById("tabelaAluno");
        var menuRem = document.getElementById("MenuBuscarAluno");
        var paginacao = document.getElementById("PaginacaoGride");
        
        tabelaRem.remove();
        menuRem.remove();
        paginacao.remove();

        document.getElementById("divLoading").style.display = "block";

        tabelaCriar("tabelaAlunoBuscar", "BuscarAlunoFK", null);

        document.getElementById("divLoading").style.display = "none";
    }


}

//Limpar dados carregados
async function limpar() {


        var tabelaRem = document.getElementById("tabelaAluno");
        var menuRem = document.getElementById("MenuBuscarAluno");
        var paginacao = document.getElementById("PaginacaoGride");

        tabelaRem.remove();
        menuRem.remove();
        paginacao.remove();

        document.getElementById("divLoading").style.display = "block";

        tabelaCriar("tabelaAlunoBuscar", "BuscarAlunoFK", null);

        document.getElementById("divLoading").style.display = "none";
    


}

//Paginação do Gride 
async function listItems(items, pageActual, limitItems)
{
    var lista = [];
    
    let totalPage = Math.ceil(items.length / limitItems);
    let count = (pageActual * limitItems) - limitItems;
    let delimiter = count + limitItems;

    if (pageActual <= totalPage) {     //TODO: Create loop

        for (let i = count; i < delimiter; i++) {
            if (items[i] != null) {

                var item = items[i];

                lista.push(item);
                count++;
            }
            
        }
    }

    return lista;

}; 

async function paginacaoTabela(pageActual, valor, totalItens) {
    var limitItems = 5;
    var pageActual = pageActual + valor;
    var totalPage = Math.ceil(totalItens / limitItems);

    if (pageActual == 0 || pageActual > totalPage) {

        return;
    }
    else {
        var tabelaRem = document.getElementById("tabelaAluno");
        var menuRem = document.getElementById("MenuBuscarAluno");
        var paginacao = document.getElementById("PaginacaoGride");

        paginacao.remove();
        tabelaRem.remove();
        menuRem.remove();

        //Cria tabela como novos parametros para pagina atual
        tabelaCriar("tabelaAlunoBuscar", "BuscarAlunoFK", pageActual);
    }



  /*  var totalPage = Math.ceil(data.length / limitItems);
    var count = (pageActual * limitItems) - limitItems;
    var delimiter = count + limitItems;*/

}

metodoConstrutor("BuscarCursoFK", "Curso", "cb", "nomeCurso", "comboboxCurso");
metodoConstrutor("BuscarPeriodoFK", "Periodo", "cb", "nomePeriodo", "comboboxPeriodo");
metodoConstrutor("BuscarProfessorFK", "Professor", "cb", "nomeProfessor", "comboboxProfessor");

tabelaCriar("tabelaAlunoBuscar", "BuscarAlunoFK", null);
