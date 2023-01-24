using Microsoft.AspNetCore.Mvc;
using WebCursoProgramacao.Models;

namespace WebCursoProgramacao.Controllers
{
    public class CursoController : Controller
    {
        private string baseurl;
        private readonly IHttpClientFactory _httpClientFactory;
        public CursoController(IConfiguration configuration, IHttpClientFactory httpClientFactory)
        {

            baseurl = configuration["baseurl"];
            _httpClientFactory = httpClientFactory;
        }


        public IActionResult Index()
        {
            return View();
        }

        //--------------------Buscar Curso
        public async Task<List<CursoCls>> BuscarCursos()
        {
            List<CursoCls> lista = await ClasseClienteHttp.BuscarLista<CursoCls>(_httpClientFactory, baseurl, "/api/Curso");
            //Rota igual a do API
            return lista;
        }

        public async Task<List<CursoCls>> BuscarCursosPorNome(string nomeCurso)
        {
            //Rota igual a do API
            if (nomeCurso != null)
            {
                List<CursoCls> lista = await ClasseClienteHttp.BuscarLista<CursoCls>(_httpClientFactory, baseurl, "/api/Curso/BuscarPorNome" + nomeCurso);

                return lista;
            }
            else
            {

                return await BuscarCursos();
            }
        }

        public async Task<CursoCls> BuscarCursosPorId(int idCurso)
        {
            //Rota igual a do API
            return await ClasseClienteHttp.Buscar<CursoCls>(_httpClientFactory, baseurl, "/api/Curso/BuscarPorID" + idCurso);

        }


        //Exclui usuário por ID
        public async Task<int> ExcluirCursoPorId(int id)
        {

            return await ClasseClienteHttp.Excluir(_httpClientFactory, baseurl, "/api/Curso/ExcluirCurso" + id);

        }

        //Adicionar ou alterar usuário
        public async Task<int> AdiconarCurso(CursoCls Curso)
        {
            return await ClasseClienteHttp.Adicionar<CursoCls>(_httpClientFactory, baseurl, "/api/Curso/AdicionarCurso", Curso);

        }


    }
}
