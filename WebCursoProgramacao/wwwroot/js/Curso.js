window.onload = function () {
    listar();
}


function listar() {
    //--------------------------------------------------------------------Preenche Data Grid
    pintar({
        url: "Curso/BuscarCursos",//URL -> Nosso comando consumir API
        cabeceras: ["Nome ", "Ementa ", "Duração "],//Cabeçário
        propiedades: ["nomeCurso", "ementaCurso", "durcaoCurso"],//Objeto
        propiedadId: "idCurso",
        popup: true,

        editar: true,
        eliminar: true,
        titlePopup: "Curso",
        urleliminar: "Curso/ExcluirCursoPorId",
        parametroeliminar: "id"
    },
        {

            url: "Curso/BuscarCursosPorNome",
            formulario: [//Passando os parâmetros para desenhar o formulário

                [
                    {
                        class: "col-md-6",
                        label: "Escreva o nome a Buscar",
                        type: "text",
                        name: "nomeCurso"
                    }

                ]

            ]

        },
        {//------------------------------------------------------Formulário Dinamicamente com Js
            //Passando os parâmetros para abrir uma janela 
            type: "popup",
            urlrecuperar: "Curso/BuscarCursosPorId",
            parametrorecuperar: "idCurso",
            urlguardar: "Curso/AdiconarCurso",
            formulario: [//Criando formulário campos e preenchendo de acordo com nosso objeto

                [
                    {
                        class: "col-md-6 d-none",// d-none -> Campo fica visible false
                        label: "Id Curso",
                        type: "text",
                        name: "idCurso"
                    },
                    {
                        class: "col-md-6",
                        label: "Nome Curso",
                        type: "text",
                        name: "nomeCurso",
                        classControl: "ob" // classControl:"ob" -> Campo obrigatório
                    },
                    {
                        class: "col-md-6",
                        label: "Duração Curso",
                        type: "text",
                        name: "durcaoCurso",
                        classControl: "ob"
                    }
                    ,
                    {
                        class: "col-md-6",
                        label: "Ementa Curso",
                        type: "textarea",
                        name: "ementaCurso",
                        classControl: "ob"
                    }

                ]
            ]


        }
    );
}