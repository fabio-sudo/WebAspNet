window.onload = function () {
    listar();
}


function listar() {
    //--------------------------------------------------------------------Preenche Data Grid
    pintar({
        url: "Professor/BuscarProfessors",//URL -> Nosso comando consumir API
        cabeceras: ["Nome ", "Sobrenome ", "CPF ", "Contato "],//Cabeçário
        propiedades: ["nomeProfessor", "sobrenomeProfessor", "cpfProfessor", "celularProfessor"],//Objeto
        propiedadId: "idProfessor",
        popup: true,

        editar: true,
        eliminar: true,
        titlePopup: "Professor",
        urleliminar: "Professor/ExcluirProfessorPorId",
        parametroeliminar: "id"
    },
        {

            url: "Professor/BuscarProfessorsPorNome",
            formulario: [//Passando os parâmetros para desenhar o formulário

                [
                    {
                        class: "col-md-6",
                        label: "Escreva o nome a Buscar",
                        type: "text",
                        name: "nomeProfessor"
                    }

                ]

            ]

        },
        {//------------------------------------------------------Formulário Dinamicamente com Js
            //Passando os parâmetros para abrir uma janela 
            type: "popup",
            urlrecuperar: "Professor/BuscarProfessorsPorId",
            parametrorecuperar: "idProfessor",
            urlguardar: "Professor/AdiconarProfessor",
            formulario: [//Criando formulário campos e preenchendo de acordo com nosso objeto

                [
                    {
                        class: "col-md-6 d-none",// d-none -> Campo fica visible false
                        label: "Id Professor",
                        type: "text",
                        name: "idProfessor"
                    },
                    {
                        class: "col-md-6",
                        label: "Nome Professor",
                        type: "text",
                        name: "nomeProfessor",
                        classControl: "ob" // classControl:"ob" -> Campo obrigatório
                    },
                    {
                        class: "col-md-6",
                        label: "Sobrenome Professor",
                        type: "text",
                        name: "sobrenomeProfessor",
                        classControl: "ob"
                    }
                    ,
                    {
                        class: "col-md-6",
                        label: "CPF Professor",
                        type: "text",
                        name: "cpfProfessor",
                        classControl: "ob"
                    }
                    ,
                    {
                        class: "col-md-6",
                        label: "Celular Professor",
                        type: "text",
                        name: "celularProfessor",
                        classControl: "ob"
                    }
                    ,
                    {
                        class: "col-md-6",
                        label: "Endereço Professor",
                        type: "text",
                        name: "enderecoProfessor",
                        classControl: "ob"
                    }
                    ,
                    {
                        class: "col-md-6",
                        label: "Nascimento Professor",
                        type: "date",
                        name: "dataNascimentoProfessorStr",
                        classControl: "ob"
                    }
                    
                ]
            ]


        }
    );
}