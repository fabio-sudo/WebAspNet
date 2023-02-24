﻿//-------------------------------------------Cria objetos
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

//-------------------------------------------------------Cria Tabela Principal
//Combobox
async function Filtros(url, id, nome, label) {

        const response = await fetch(url);
        var dataFiltro = await response.json();

    var itemFiltro = '<option class="form-control" value="" >Todos</option >';
        dataFiltro.map((item) => {

            itemFiltro += `<option class="form-control" value="${item[id]}" >${item[nome]}</option >`
        });

    var filtro = `    <div class="campoFiltro">
                      <label class"lbFiltro">${label}</label>
                      <select class="form-control" name="ListaCurso">
                       ${itemFiltro}   </select>
                       </div>`
       ;

        return filtro;
}

async function BuscarConteudoGrid(url) {

    const response = await fetch(url);
    var listaRetorno = await response.json();

    var rows = "";
    listaRetorno.map((item) => {

        rows += `<tr><td> 
                       <img style="width:100px;height:100px" src="${item.alunoCls.imgStr}">
                       <td style='vertical-align:middle'><span> ${item.ordemMatricula}</span></td>
                       <td style='vertical-align:middle'><span> ${item.alunoCls.nomeAluno}</span></td>
                       <td style='vertical-align:middle'><span> ${item.alunoCls.cpfAluno}</span></td>
                       <td style='vertical-align:middle'><span> ${item.alunoCls.celularAluno}</span></td>
                       <td style='vertical-align:middle'><span> ${item.cursoCls.nomeCurso}</span></td>
                       <td style='vertical-align:middle'><span> ${item.professorCls.nomeProfessor}</span></td>
                       <td style='vertical-align:middle'><span> ${item.periodoCls.nomePeriodo}</span></td>
                       <td style='vertical-align:middle'><span> ${item.diaSemanaCurso}</span></td>
                       <td style='vertical-align:middle'><span> ${item.statusCurso}</span></td> 
                       <td class='botoesDentroGrid'>
                        <div id="btAlterar">
                        <i data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="" class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"></path>
                        </svg></i>
                        </div>
                        <div id="btExcluir">
                        <i onclick="" class="btn btn-danger" > <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path>
                        </svg></i>
                        </div>
                        </td>`

    });

    return rows;
}

async function GerarTabelaPrincipal() {

    const criaTabela = document.getElementById('Tabela');

    var filtroCurso = await  Filtros("BuscarCursoFK","idCurso", "nomeCurso", "Curso");
    var filtroPeriodo = await Filtros("BuscarPeriodoFK","idPeriodo", "nomePeriodo", "Periodo");
    var filtroProfessor = await Filtros("BuscarProfessorFK", "idProfessor", "nomeProfessor", "Professor");
    var corpoTabela = await BuscarConteudoGrid("BuscarAluno_Curso");

    const menuBusca = `<div class="caixaTextoBuscar" id="MenuBuscaAlunoCurso">
        <div id="AlinhaFiltros">
        <div class="campoFiltroBusca">
        <label Id="lbAluno">Escreva o nome a Buscar</label>
        <br />
        <input type="text" class="form-control" id="nomeAlunoBuscarMenu" />
        </div>
        ${filtroCurso}
        ${filtroPeriodo}
        ${filtroProfessor}
        </div>
        <div class="botoesBusca">
            <a class="btn btn-primary" onclick="">Buscar </a>
            <a class="btn btn-danger" onclick="">Limpar </a>
        </div>
    </div>    
             `;

    var tabela = "<br/>";
    tabela += `${menuBusca}`;
    tabela += `
    <div class='table-responsive'>
    <table id='tablita' class='table'>
    <thead>
      <tr>
        <th scope="col">Foto</th>
        <th scope="col">Ordem</th>
        <th scope="col">Nome</th>
        <th scope="col">CPF</th>
        <th scope="col">Contato</th>
        <th scope="col">Curso</th>
        <th scope="col">Professor</th>
        <th scope="col">Período</th>
        <th scope="col">Dia</th>
        <th scope="col">Status</th>
        <th scope="col">Operações</th>
     </tr>
    </thead>
    <body>

${corpoTabela}


    </body>
    </table>
   </div>`;







    criaTabela.insertAdjacentHTML('beforeend', tabela);
/*
    var nregistros = dataCompleta.length;
    var obj;
    var propiedadActual;
    var existeIdCheck = false;


    contenido += "<tbody id='tbody'>";
    for (var i = inicio; i < fin; i++) {
        if (nregistros - 1 >= i) {
            obj = res[i]

            contenido += `<tr ${objConfiguracionGlobal != null && objConfiguracionGlobal.cursor != undefined ?
                "style='cursor:pointer'" : ''}

                        ${objConfiguracionGlobal != null && objConfiguracionGlobal.rowClickRecuperar != undefined ?
                    `onclick='rowClickRecuperarGenerico(${obj[objConfiguracionGlobal.propiedadId]})'
                    style='cursor:pointer'` : ""}

                        ${objConfiguracionGlobal != null && objConfiguracionGlobal.rowClick != undefined ?
                    `onclick='rowClickEvent(${JSON.stringify(obj)})'` : ""}
                  >`;
            if (objConfiguracionGlobal != undefined && objConfiguracionGlobal.check == true) {
                existeIdCheck = (idsChecks.indexOf(obj[objConfiguracionGlobal.propiedadId]) > -1);
                contenido += `<td><input type='checkbox'
                                 ${existeIdCheck == true ? "checked" : ""}
                                class='Check ${obj[objConfiguracionGlobal.propiedadId]}'
                             name="${objConfiguracionGlobal.propiedadId}[]"
                        value="${obj[objConfiguracionGlobal.propiedadId]}" /></td> `
            }
            for (var j = 0; j < objConfiguracionGlobal.propiedades.length; j++) {
                propiedadActual = objConfiguracionGlobal.propiedades[j]

                if (objConfiguracionGlobal.columnaimg != undefined && objConfiguracionGlobal.columnaimg.includes(propiedadActual))
                    contenido += "<td><img style='width:100px;height:100px' src='" + obj[propiedadActual] + "' /></td>";

                else
                    contenido += "<td style='vertical-align:middle'><span>" + obj[propiedadActual] + "</span></td>";

            }

            if (objConfiguracionGlobal.editar == true || objConfiguracionGlobal.eliminar == true) {
                //var propiedadId = objConfiguracionGlobal.propiedadId;
                contenido += "<td>";
                if (objConfiguracionGlobal.editar == true) {
                    var tienepopup = objConfiguracionGlobal.popup
                    contenido += `<i 
                        ${tienepopup == true ? `data-bs-toggle="modal" data-bs-target="#${objConfiguracionGlobal.popupId}" ` : ``}
                onclick=" ${objFormularioGlobal == undefined ? `CallbackEditar(${obj[objConfiguracionGlobal.propiedadId]})` :
                            `EditarGenerico(${obj[objConfiguracionGlobal.propiedadId]})`
                        } " class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                  </svg ></i>`
                }
                if (objConfiguracionGlobal.eliminar == true) {
                    contenido += `
             <i onclick="CallbackEliminar(${obj[objConfiguracionGlobal.propiedadId]})"
                       class="btn btn-danger"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                  class="bi bi-trash-fill" viewBox="0 0 16 16">
                 <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg></i>
            `
                }
                contenido += "</td>";
            }


            contenido += "</tr>";
        }
    }
    contenido += "</tbody>"
    contenido += "<tfoot id='tdPagina'>";
    contenido += "</tfoot>";

    contenido += "</table></div>";
    return contenido;
    */
}

//Inicializa o formulário preenchendo os combobox
metodoConstrutor("BuscarCursoFK", "Curso", "cb", "nomeCurso", "comboboxCurso");
metodoConstrutor("BuscarPeriodoFK", "Periodo", "cb", "nomePeriodo", "comboboxPeriodo");
metodoConstrutor("BuscarProfessorFK", "Professor", "cb", "nomeProfessor", "comboboxProfessor");

//inicializa o formulário preenchendo o gride
tabelaCriar("BuscarAlunoFK", null);


