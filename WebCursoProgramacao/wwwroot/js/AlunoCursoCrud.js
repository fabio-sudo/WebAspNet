//-------------------------------------------Cria objetos
var data;
var dataTabela;
var dataTabelaCad = [];

//Criar Combobox
function metodoConstrutor(urlApi, labelApi, controleApi, objName, objConteiner) {

    //Pegando URL API 
    const url = urlApi;
    //Atribuindo conteudo do HTML em uma variavel para JS
    const postsContainer = document.querySelector("#" + objConteiner);


    //Função gera campos da API
    async function getAllPosts(labelName, objTipo) {

        const response = await fetch(url);
        data = await response.json();

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
async function tabelaCriar(urlTabela, paginacaoTabela) {

    const response = await fetch(urlTabela);
    dataTabela = await response.json();


    //--------------------------Footer Paginação
    var paginacao = paginacaoTabela;

    if (paginacao == null) {

        paginacao = 1;
    }

    //-------------------------------------------------------Delimitador de objetos no Gride

    await criaTabelaAluno(dataTabela, 1);
    await criaTabelaAlunoCurso(dataTabelaCad, 1);

}


//-----------------------------------------Funções

//Metodo add item Gride
async function metodoAddItemLista() {

    var listaMarcados = document.getElementsByClassName("cbAluno");

    for (loop = 0; loop < listaMarcados.length; loop++) {

        var item = listaMarcados[loop];
        if (item.type == "checkbox" && item.checked) {

            dataTabela.map((itemTabela) => {
                if (item.id == itemTabela.idAluno) {


                    dataTabelaCad.push(itemTabela);
                    dataTabela.splice(dataTabela.indexOf(itemTabela), 1);

                }
            });
        }
    }

    limparGride();

    await criaTabelaAluno(dataTabela, 1);
    await criaTabelaAlunoCurso(dataTabelaCad, 1);

}

//Método rem item GridAlunoCurso
async function metodoRemoveItemLista() {

    var listaMarcados = document.getElementsByClassName("cbAlunoCurso");

    for (loop = 0; loop < listaMarcados.length; loop++) {

        var item = listaMarcados[loop];
        if (item.type == "checkbox" && item.checked) {

            dataTabelaCad.map((itemTabela) => {
                if (item.id == itemTabela.idAluno) {

                    dataTabelaCad.splice(dataTabelaCad.indexOf(itemTabela), 1);
                    dataTabela.push(itemTabela);

                }
            });
        }
    }

    limparGride();

    await criaTabelaAluno(dataTabela.sort(), 1);
    await criaTabelaAlunoCurso(dataTabelaCad.sort(), 1);




}

//Metodo compara listas
async function comparaListas(lista, listaAdd) {

    lista = lista.filter((objeto) => !listaAdd.find(objCad => objCad.idAluno === objeto.idAluno));
    return lista;
}

//Buscar itens gride por nome
async function buscarPorNome(paginaAtual) {

    const nomeBuscar = document.querySelector("#nomeAlunoBuscar");

    if (nomeBuscar.value != "") {

        limparGride();
        const nome = nomeBuscar.value.toLowerCase();

        //Busca por nome Lista
        const novaLista = dataTabela.filter(p => p.nomeAluno.includes(nome));


        //Paginação
        const paginacao = paginaAtual;

        if (paginacao == null) {

            paginacao = 1;
        }


        await criaTabelaAluno(novaLista, paginacao);
        await criaTabelaAlunoCurso(dataTabelaCad, 1);

    } else {

        //Pegando URL API 
        const url = "BuscarAlunosPorNomeFK/?nomeAluno=" + nomeBuscar.value;
        const response = await fetch(url);

        newData = await response.json();

        if (dataTabelaCad.length > 0) {

            newData = await comparaListas(newData, dataTabelaCad);

        }
        newData.length;

        limparGride();

        await criaTabelaAluno(newData, 1);
        await criaTabelaAlunoCurso(dataTabelaCad, 1);
    }


}

//Função cria tabela
async function criaTabelaAluno(lista, paginacao) {

    var criarTabela = document.getElementById('tabelaAlunoBuscar');

    //Botões laterais
    var botoesLateraisBusca = await criaBotoesLaterais();

    //Menu de Busca
    var buscarMenuBusca = await criaMenuBusca(paginacao);

    //Rodapé da tabela
    var rodapeTabelaBusca = await criarRodapeTabelaAluno(lista, paginacao);

    lista = await listItems(lista, paginacao, 5);

    //Itens da tabela
    var bodyTabelaBusca = await criaItensGrid(lista, "cbAluno");

    var tabelaBusca = ` 
            ${buscarMenuBusca} 
     <div class="GridAluno" id="GridAlunoId">
            <table class="table" id="tabelaAluno">
            <thead class="thead-dark">
                <tr>
                        <th scope="col">...</th>
                        <th scope="col">ID</th>
                        <th scope="col">Nome</th>
                        <th scope="col">CPF</th>
                        <th scope="col">Celular</th>
                </tr>
             </thead>
                  <tbody id="tabelaCorpoAluno">
                        ${bodyTabelaBusca} 
                </tbody>
            </table>
                ${rodapeTabelaBusca}
     </div>
        <div id="tabelaAlunoCurso">
         
        </div>
         <div>
               ${botoesLateraisBusca}
         </div>
             `;

    criarTabela.insertAdjacentHTML('beforeend', tabelaBusca);

    document.getElementById("nomeAlunoBuscar").focus();
}

//Função cria tabela Aluno Curso
async function criaTabelaAlunoCurso(lista, paginacao) {

    var criarTabela = document.getElementById('tabelaAlunoCurso');

    //Rodapé da tabela
    var rodapeTabela = await criarRodapeTabela(lista, paginacao)

    lista = await listItems(lista, paginacao, 5);

    //Itens da tabela
    var bodyTabela = await criaItensGrid(lista, "cbAlunoCurso");

    var tabelaAlunoCurso = `     
      <div class="GridAlunoCad" id="GridCadastraAluno">
            <table class="table" id="tabelaAlunoCad">
            <thead class="thead-dark">
                <tr>
                        <th scope="col">...</th>
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
        </div>`

    criarTabela.insertAdjacentHTML('beforeend', tabelaAlunoCurso);

    document.getElementById("nomeAlunoBuscar").focus();
}

//----------------------------------------------Criação Tabela Aluno
//Cria menu de busca
async function criaMenuBusca(paginacao) {

    const menuBusca = `<div class="caixaTextoBuscar" id="MenuBuscaAluno">
        <label Id="lbAluno">Aluno</label>
        <br />
        <input type="text" class="form-control" id="nomeAlunoBuscar" />
        <div class="botoesBusca">
            <a class="btn btn-dark" onclick="buscarPorNome(${paginacao})">Buscar </a>
            <a class="btn btn-danger" onclick="Limpar()">Limpar </a>
        </div>
    </div>    
             `;

    return menuBusca;

}

//Cria botões laterais
async function criaBotoesLaterais() {

    const botoesLaterais = `
    <div class="BotoesAddRemove" id="BotoesGrid">
    <a class="btn btn-dark" id="btAdd" onclick="metodoAddItemLista()">ADD</a>
    <a class="btn btn-dark" id="btRem" onclick="metodoRemoveItemLista()">REM</a>
    </div>
     `;

    return botoesLaterais;

}

//Busca itens do dataGrid
async function criaItensGrid(lista, nameClass) {

    //Items da tabela
    var itemsTabela = lista.map((item) => {
        return `<tr>
                        <td>
                        <input type="checkbox" class="${nameClass}" id="${item.idAluno}" onchange="onChange(this,${item.idAluno})"/>
                        </td>
                        <td>${item.idAluno}</td>
                        <td>${item.nomeAluno}</td>
                        <td>${item.cpfAluno}</td>
                        <td>${item.celularAluno}</td>
                      </tr>`;
    }).join('');

    let contador = lista.length;
    if (contador < 5) {

        while (contador < 5) {
            itemsTabela += `<tr>
                          <td>
                           <input type="checkbox" class="custom-control-input" disabled/>
                           </td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                         </tr>`;

            contador++;
        }


    }

    return itemsTabela;

}

//rodapé da tabela
async function criarRodapeTabelaAluno(lista, paginacao) {

    var QuantiadePaginas = Math.ceil(lista.length / 5);
    var contadorPaginas = lista.length;

    //rodapé da tabela
    var rodapeTabela = `
      <div class="alinhaPaginacao" id="PaginacaoGrideAluno">
       <a class="btn btn-dark" onclick="paginacaoTabelaAluno(${paginacao},-1,${contadorPaginas})">Voltar </a>
   `;

    for (let i = 1; i <= QuantiadePaginas; i++) {
        if (i == paginacao) {
            rodapeTabela += `
            <a class="btn btn-danger" id = "idPaginacao" onclick="paginacaoTabelaAluno(${i}, 0 ,${contadorPaginas})" > ${i} </a>
        `;
        } else {
            rodapeTabela += `
            <a class="btn btn-dark" id = "idPaginacao" onclick="paginacaoTabelaAluno(${i}, 0 ,${contadorPaginas})" > ${i} </a>
        `;
        }
    }

    rodapeTabela += `
       <a class="btn btn-dark" onclick="paginacaoTabelaAluno(${paginacao},1,${contadorPaginas})">Avançar </a>
    </div>
     `;

    return rodapeTabela;

}

//rodapé da tabela
async function criarRodapeTabela(lista, paginacao) {

    var QuantiadePaginas = Math.ceil(lista.length / 5);
    var contadorPaginas = lista.length;

    //rodapé da tabela
    var rodapeTabela = `
      <div class="alinhaPaginacao" id="PaginacaoGride">
       <a class="btn btn-dark" onclick="paginacaoTabela(${paginacao},-1,${contadorPaginas})">Voltar </a>
   `;

    for (let i = 1; i <= QuantiadePaginas; i++) {
        if (i == paginacao) {
            rodapeTabela += `
            <a class="btn btn-danger" id = "idPaginacao" onclick="paginacaoTabela(${i}, 0 ,${contadorPaginas})" > ${i} </a>
        `;
        } else {
            rodapeTabela += `
            <a class="btn btn-dark" id = "idPaginacao" onclick="paginacaoTabela(${i}, 0 ,${contadorPaginas})" > ${i} </a>
        `;
        }
    }

    rodapeTabela += `
       <a class="btn btn-dark" onclick="paginacaoTabela(${paginacao},1,${contadorPaginas})">Avançar </a>
    </div>
     `;

    return rodapeTabela;

}

//--------------------------------------------------------------

//Limpar dados carregados
async function limpar() {

    limparGride();

    tabelaCriar("tabelaAlunoBuscar", "BuscarAlunoFK", null);

}

//Paginação do Gride 
async function listItems(items, pageActual, limitItems) {
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

//Paginação da tabela
async function paginacaoTabelaAluno(pageActual, valor, totalItens) {
    var limitItems = 5;
    var pageActual = pageActual + valor;
    var totalPage = Math.ceil(totalItens / limitItems);

    if (pageActual == 0 || pageActual > totalPage) {

        return;
    }
    else {
        limparGride();

        await criaTabelaAluno(dataTabela, pageActual);
        await criaTabelaAlunoCurso(dataTabelaCad, 1);
    }

}

//Paginação da tabela
async function paginacaoTabela(pageActual, valor, totalItens) {
    var limitItems = 5;
    var pageActual = pageActual + valor;
    var totalPage = Math.ceil(totalItens / limitItems);

    if (pageActual == 0 || pageActual > totalPage) {

        return;
    }
    else {

        $("#GridCadastraAluno").remove();
        $("#PaginacaoGride").remove();

        await criaTabelaAlunoCurso(dataTabelaCad, pageActual);
    }

}

//Limpar Grid
async function limparGride() {

    $("#GridAlunoId").remove();
    $("#tabelaAlunoCurso").remove();
    $("#MenuBuscaAluno").remove();
    $("#PaginacaoGride").remove();
    $("#BotoesGrid").remove();
    $("#GridCadastraAluno").remove();
    $("#PaginacaoGrideAluno").remove();

}


//Inicializa o formulário preenchendo os combobox
metodoConstrutor("BuscarCursoFK", "Curso", "cb", "nomeCurso", "comboboxCurso");
metodoConstrutor("BuscarPeriodoFK", "Periodo", "cb", "nomePeriodo", "comboboxPeriodo");
metodoConstrutor("BuscarProfessorFK", "Professor", "cb", "nomeProfessor", "comboboxProfessor");

//inicializa o formulário preenchendo o gride
tabelaCriar("BuscarAlunoFK", null);



