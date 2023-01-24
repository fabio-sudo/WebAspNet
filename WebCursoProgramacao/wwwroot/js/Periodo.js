window.onload = function () {
    listar();
}


function listar() {
    //--------------------------------------------------------------------Preenche Data Grid
    pintar({
        url: "Periodo/BuscarPeriodos",//URL -> Nosso comando consumir API
        cabeceras: ["Periodo ", "Horário Entrada", "Horário Saída"],//Cabeçário
        propiedades: ["nomePeriodo", "horarioInicialStr", "horarioFinalStr"],//Objeto
        propiedadId: "idPeriodo",
        popup: true,

        editar: true,
        eliminar: true,
        titlePopup: "Periodo",
        urleliminar: "Periodo/ExcluirPeriodoPorId",
        parametroeliminar: "id"
    },
        {

            url: "Periodo/BuscarPeriodosPorNome",
            formulario: [//Passando os parâmetros para desenhar o formulário

                [
                    {
                        class: "col-md-6",
                        label: "Escreva o nome a Buscar",
                        type: "text",
                        name: "nomePeriodo"
                    }

                ]

            ]

        },
        {//------------------------------------------------------Formulário Dinamicamente com Js
            //Passando os parâmetros para abrir uma janela 
            type: "popup",
            urlrecuperar: "Periodo/BuscarPeriodosPorId",
            parametrorecuperar: "idPeriodo",
            urlguardar: "Periodo/AdiconarPeriodo",
            formulario: [//Criando formulário campos e preenchendo de acordo com nosso objeto

                [
                    {
                        class: "col-md-6 d-none",// d-none -> Campo fica visible false
                        label: "Id Periodo",
                        type: "text",
                        name: "idPeriodo"
                    },
                    {
                        class: "col-md-6",
                        label: "Nome Periodo",
                        type: "text",
                        name: "nomePeriodo",
                        classControl: "ob" // classControl:"ob" -> Campo obrigatório
                    },
                    {
                        class: "col-md-6",
                        label: "Horário Entrada",
                        type: "timerStr",
                        name: "horarioInicialStr",
                        classControl: "ob"
                    }
                    ,
                    {
                        class: "col-md-6",
                        label: "Horário Saída",
                        type: "timerStr",
                        name: "horarioFinalStr",
                        classControl: "ob"
                    }
                    

                ]
            ]


        }
    );
}