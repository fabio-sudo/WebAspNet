window.onload = function () {

    GerarTabelaPrincipal();
    listar();

}


async function listar() {
    var dataCurso = await fetchGet("AlunoCurso/BuscarCursoFK", "json", null, true)
    var dataPeriodo = await fetchGet("AlunoCurso/BuscarPeriodoFK", "json", null, true)
    var dataProfessor = await fetchGet("AlunoCurso/BuscarProfessorFK", "json", null, true)
    //--------------------------------------------------------------------Preenche Data Grid
    pintar({
        url: "AlunoCurso/BuscarAlunoCurso",//URL -> Nosso comando consumir API
        cabeceras: ["Foto", "Matricula", "Nome ", "CPF ", "Contato ", "Professor", "Curso", "Periodo", "Dia Curso", "Status"],//Cabeçário
        propiedades: ["imgStr", "ordemMatricula", "nomeAluno", "cpfAluno", "celularAluno", "nomeProfessor", "nomeCurso", "nomePerido", "diaSemanaCurso", "statusCurso"],//Objeto
        propiedadId: "idAlunoCurso",
        columnaimg: ["imgStr"],
    },
        {
            //Formuário de Busca
            url: "AlunoCurso/BuscarAlunoCursoPorNome",
            formulario: [//Passando os parâmetros para desenhar o formulário

                [
                    {
                        class: "col-md-6",
                        label: "Escreva o nome a Buscar",
                        type: "text",
                        name: "nomeAluno"
                    }
                    ,
                    {
                        class: "col-md-6",
                        label: "Filtro Curso",
                        type: "combobox",
                        name: "idCurso",
                        data: dataCurso,
                        propiedadmostrar: "nomeCurso",
                        valuemostrar: "idCurso",
                        id: "cbCursoBuscar"
                    }
                    ,
                    {
                        class: "col-md-6",
                        label: "Filtro Periodo",
                        type: "combobox",
                        name: "idPeriodo",
                        data: dataPeriodo,
                        propiedadmostrar: "nomePeriodo",
                        valuemostrar: "idPeriodo",
                        id: "cbPeriodoBuscar"
                    }
                    ,
                    {
                        class: "col-md-6",
                        label: "Filtro Professor",
                        type: "combobox",
                        name: "idProfessor",
                        data: dataProfessor,
                        propiedadmostrar: "nomeProfessor",
                        valuemostrar: "idProfessor",
                        id: "cbProfessorBuscar"
                    }


                ]

            ]

        }/*,

        {
            //------------------------------------------------------Formulário Dinamicamente com Js
            //Passando os parâmetros para abrir uma janela 
            type: "popup",
            urlrecuperar: "AlunoCurso/BuscarAlunoCurso",
            parametrorecuperar: "idAlunoCurso",
            urlguardar: "AlunoCurso/AdicionarAlunoCurso",
            formulario: [//Criando formulário campos e preenchendo de acordo com nosso objeto

                [
                    {
                        class: "col-md-6 d-none",// d-none -> Campo fica visible false
                        label: "Id",
                        type: "text",
                        name: "idAlunoCurso"
                    },
                    {
                        class: "col-md-6",// d-none -> Campo fica visible false
                        label: "Matricula",
                        type: "text",
                        name: "OrdemMatricula"
                    },
                    {
                        class: "col-md-6",
                        label: "Aluno",
                        type: "combobox",
                        name: "idAluno",
                        data: dataAluno,
                        propiedadmostrar: "nomeAluno",
                        valuemostrar: "idAluno",
                        id: "cbAlunoBuscarCad"
                    },
                    {
                        class: "col-md-6",
                        label: "Curso",
                        type: "combobox",
                        name: "idCurso",
                        data: dataCurso,
                        propiedadmostrar: "nomeCurso",
                        valuemostrar: "idCurso",
                        id: "cbCursoBuscarCad"
                    }
                    ,
                    {
                        class: "col-md-6",
                        label: "Periodo",
                        type: "combobox",
                        name: "idPeriodo",
                        data: dataPeriodo,
                        propiedadmostrar: "nomePeriodo",
                        valuemostrar: "idPeriodo",
                        id: "cbPeriodoBuscarCad"
                    }
                    ,
                    {
                        class: "col-md-6",
                        label: "Professor",
                        type: "combobox",
                        name: "idProfessor",
                        data: dataProfessor,
                        propiedadmostrar: "nomeProfessor",
                        valuemostrar: "idProfessor",
                        id: "cbProfessorBuscarCad"
                    },
                    {
                        class: "col-md-6",
                        label: "Dia Semana",
                        type: "comboboxAC",
                        name: "DiaSemanaCurso",
                        classControl: "ob"
                    },
                    {
                        class: "col-md-6",
                        label: "Status",
                        type: "comboboxStr",
                        name: "statusCurso",
                        classControl: "ob"
                    }
        
                ]
            ]
            
        }

*/
    )
}