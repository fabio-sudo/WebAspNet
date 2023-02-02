//-------------------------------------------Cria objetos
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


    //--------------------------Footer Paginação
    var QuantiadePaginas = Math.ceil(data.length / 5);
    var paginacao = paginacaoTabela;

   if (paginacao == null) {

        paginacao = 1;
    }

   var rodapeTabela = `
    <div class="alinhaPaginacao" id="PaginacaoGride">
       <a class="btn btn-dark" onclick="paginacaoTabela(${paginacao},-1,${data.length})">Voltar </a>
   `

    for (let i = 1; i <= QuantiadePaginas; i++) {
        if (i == paginacao) {
            rodapeTabela += `
            <a class="btn btn-danger" id = "idPaginacao" onclick="paginacaoTabela(${i}, 0 ,${data.length})" > ${i} </a>
        `
        } else {
            rodapeTabela += `
            <a class="btn btn-dark" id = "idPaginacao" onclick="paginacaoTabela(${i}, 0 ,${data.length})" > ${i} </a>
        `
        }
    }

    rodapeTabela += `
       <a class="btn btn-dark" onclick="paginacaoTabela(${paginacao},1,${data.length})">Avançar </a>
    </div>
     `;
    //--------------------------------------------------------


    //-------------------------------------------------------Delimitador de objetos no Gride
    const listaItemObj =
        await listItems(data, paginacao, 5);
    //-------------------------------------------------------------------


    //--------------------------------------------Criação das colunas da tabela
    var bodyTabela = listaItemObj.map((item) => {
        return `<tr>
                        <td>
                        <input type="checkbox" class="custom-control-input" id="${item.idAluno}" onchange="onChange(this,${item.idAluno})"/>
                        </td>
                        <td>${item.idAluno}</td>
                        <td>${item.nomeAluno}</td>
                        <td>${item.cpfAluno}</td>
                        <td>${item.celularAluno}</td>
                      </tr>`;
    }).join('');

    //-----------------------------------------------Menu de busca 
    var buscarMenu = 
        `   <div class="caixaTextoBuscar">
               <label Id="lbAluno">Aluno</label>
               <br/>
               <input type="text" class="form-control" id="nomeAlunoBuscar"/> 
                   <div class="botoesBusca">
                      <a  class="btn btn-dark" onclick="buscarPorNome()">Buscar </a>
                      <a  class="btn btn-danger" onclick="Limpar()">Limpar </a>
                   </div>
              </div>    
             `;

//-----------------------------------------------Botões Laterais
var botoesLaterais = `
    <div class="BotoesAddRemove">
    <a class="btn btn-dark" id="btAdd">ADD</a>
    <a class="btn btn-dark" id="btRem">REM</a>
    </div>
     `;
//-----------------------------------------------Tabela Alunos ADD
var tabelaAlunoCad = `     

<div class="GridAlunoCad">
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
     </div>

</div>

`

//------------------------------------------------Criação da Tabela
    var tabela = `
            ${buscarMenu} 
        <div class="GridAluno">
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
                  <tbody>
                        ${bodyTabela} 
                </tbody>
            </table>
                ${rodapeTabela}
        </div>
           <div>
               ${tabelaAlunoCad}
         </div>
         <div>
               ${botoesLaterais}
         </div>


      </div>
             `;

    //--------------------------------Inserir tabela na div do HTML

    root.insertAdjacentHTML('beforeend', tabela);

}



//-----------------------------------------Funções 
//Buscar itens gride por nome
async function buscarPorNome() {


 var nomeBuscar = document.querySelector("#nomeAlunoBuscar");

    if (nomeBuscar.value != "") {

        limparGride();

        tabelaCriar("tabelaAlunoBuscar", "BuscarAlunosPorNomeFK/?nomeAluno=" + nomeBuscar.value, null);

    } else {

        limparGride();
        tabelaCriar("tabelaAlunoBuscar", "BuscarAlunoFK", null);
    }


}

//Limpar dados carregados
async function limpar() {

    limparGride();

        tabelaCriar("tabelaAlunoBuscar", "BuscarAlunoFK", null);

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
        limparGride();

        //Cria tabela como novos parametros para pagina atual
        tabelaCriar("tabelaAlunoBuscar", "BuscarAlunoFK", pageActual);
    }

}

//Limpar Grid
async function limparGride() {

    $("#tabelaAluno").remove();
    $("#MenuBuscarAluno").remove();
    $("#PaginacaoGride").remove();
}

//Recebe id checked box
function onChange(element,id) {
    console.log('Agreement changed to ' + element.checked+ id);
}

//Inicializa o formulário preenchendo os combobox
metodoConstrutor("BuscarCursoFK", "Curso", "cb", "nomeCurso", "comboboxCurso");
metodoConstrutor("BuscarPeriodoFK", "Periodo", "cb", "nomePeriodo", "comboboxPeriodo");
metodoConstrutor("BuscarProfessorFK", "Professor", "cb", "nomeProfessor", "comboboxProfessor");

//inicializa o formulário preenchendo o gride
tabelaCriar("tabelaAlunoBuscar", "BuscarAlunoFK", null);



