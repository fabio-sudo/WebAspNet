using Microsoft.AspNetCore.Mvc;
using WebCursoProgramacao.Models;

namespace WebCursoProgramacao.Controllers
{
    public class PeriodoController : Controller
    {
        private string baseurl;
        private readonly IHttpClientFactory _httpClientFactory;
        public PeriodoController(IConfiguration configuration, IHttpClientFactory httpClientFactory)
        {

            baseurl = configuration["baseurl"];
            _httpClientFactory = httpClientFactory;
        }

        public IActionResult Index()
        {
            return View();
        }


        public async Task<List<PeriodoCls>> BuscarPeriodos()
        {
            List<PeriodoCls> lista = await ClasseClienteHttp.BuscarLista<PeriodoCls>(_httpClientFactory, baseurl, "/api/Periodo");
            return lista;
        }

        public async Task<List<PeriodoCls>> BuscarPeriodosPorNome(string nomePeriodo)
        {
            //Rota igual a do API
            if (nomePeriodo != null)
            {
                List<PeriodoCls> lista = await ClasseClienteHttp.BuscarLista<PeriodoCls>(_httpClientFactory, baseurl, "/api/Periodo/BuscarPorNome" + nomePeriodo);
                return lista;
            }
            else
            {

                return await BuscarPeriodos();
            }
        }

        public async Task<PeriodoCls> BuscarPeriodosPorId(int idPeriodo)
        {
            //Rota igual a do API
            return await ClasseClienteHttp.Buscar<PeriodoCls>(_httpClientFactory, baseurl, "/api/Periodo/BuscarPorID" + idPeriodo);

        }


        //Exclui usuário por ID
        public async Task<int> ExcluirPeriodoPorId(int id)
        {

            return await ClasseClienteHttp.Excluir(_httpClientFactory, baseurl, "/api/Periodo/ExcluirPeriodo" + id);

        }

        //Adicionar ou alterar usuário
        public async Task<int> AdiconarPeriodo(PeriodoCls Periodo)
        {
            DateTime dateInicial = DateTime.ParseExact(Periodo.HorarioInicialStr, "HH:mm", System.Globalization.CultureInfo.CurrentCulture);
            DateTime dateFinal = DateTime.ParseExact(Periodo.HorarioFinalStr, "HH:mm", System.Globalization.CultureInfo.CurrentCulture);

            Periodo.HorarioInicial= dateInicial;
            Periodo.HorarioFinal= dateFinal;


            return await ClasseClienteHttp.Adicionar<PeriodoCls>(_httpClientFactory, baseurl, "/api/Periodo/AdicionarPeriodo", Periodo);
        }

    }
}
