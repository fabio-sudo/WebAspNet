window.onload = function () {
    listar();
}


function listar() {
    //--------------------------------------------------------------------Preenche Data Grid
    pintar({
        url: "Aluno/BuscarAlunos",//URL -> Nosso comando consumir API
        cabeceras: ["Foto", "Nome ", "Sobrenome ", "CPF ", "Contato "],//Cabeçário
        propiedades: ["imgStr", "nomeAluno", "sobrenomeAluno", "cpfAluno", "celularAluno"],//Objeto
        propiedadId: "idAluno",
        columnaimg: ["imgStr"],
        popup: true,

        editar: true,
        eliminar: true,
        titlePopup: "Aluno",
        urleliminar: "Aluno/ExcluirAlunoPorId",
        parametroeliminar: "id"
    },
        {

            url: "Aluno/BuscarAlunosPorNome",
            formulario: [//Passando os parâmetros para desenhar o formulário

                [
                    {
                        class: "col-md-6",
                        label: "Escreva o nome a Buscar",
                        type: "text",
                        name: "nomeAluno"
                    }

                ]

            ]

        },
        {//------------------------------------------------------Formulário Dinamicamente com Js
            //Passando os parâmetros para abrir uma janela 
            type: "popup",
            urlrecuperar: "Aluno/BuscarAlunosPorId",
            parametrorecuperar: "idAluno",
            urlguardar: "Aluno/AdiconarAluno",
            formulario: [//Criando formulário campos e preenchendo de acordo com nosso objeto

                [
                    {
                        class: "col-md-6 d-none",// d-none -> Campo fica visible false
                        label: "Id Aluno",
                        type: "text",
                        name: "idAluno"
                    },
                    {
                        class: "col-md-6",
                        label: "Nome Aluno",
                        type: "text",
                        name: "nomeAluno",
                        classControl: "ob" // classControl:"ob" -> Campo obrigatório
                    },
                    {
                        class: "col-md-6",
                        label: "Sobrenome Aluno",
                        type: "text",
                        name: "sobrenomeAluno",
                        classControl: "ob"
                    }
                    ,
                    {
                        class: "col-md-6",
                        label: "CPF Aluno",
                        type: "text",
                        name: "cpfAluno",
                        classControl: "ob"
                    }
                    ,
                    {
                        class: "col-md-6",
                        label: "Celular Aluno",
                        type: "text",
                        name: "celularAluno",
                        classControl: "ob"
                    }
                    ,
                    {
                        class: "col-md-6",
                        label: "Endereço Aluno",
                        type: "text",
                        name: "enderecoAluno",
                        classControl: "ob"
                    }
                    ,
                    {
                        class: "col-md-6",
                        label: "Nascimento Aluno",
                        type: "date",
                        name: "dataNascimentoAlunoStr",
                        classControl: "ob"
                    }
                    ,
                    {
                        class: "col-md-6",
                        label: "Status Aluno",
                        type: "comboboxStr",
                        name: "statusAluno",
                        classControl: "ob"
                    },
                    {
                        class: "col-md-6",
                        type: "file",
                        label: "Imagem Aluno",
                        name: "imgEnviar",
                        preview: true,
                        imgwidth: 100,
                        imgheight: 100,
                        namefoto: "imgStr"
                    }


                ]
            ]


        }
    );
}