using Microsoft.AspNetCore.Mvc;
using WebCursoProgramacao.Models;

namespace WebCursoProgramacao.Controllers
{
    public class ProfessorController : Controller
    {
        private string baseurl;
        private readonly IHttpClientFactory _httpClientFactory;
        public ProfessorController(IConfiguration configuration, IHttpClientFactory httpClientFactory)
        {

            baseurl = configuration["baseurl"];
            _httpClientFactory = httpClientFactory;
        }
        public IActionResult Index()
        {
            return View();
        }

        //--------------------Buscar Professor
        public async Task<List<ProfessorCls>> BuscarProfessors()
        {
            List<ProfessorCls> lista = await ClasseClienteHttp.BuscarLista<ProfessorCls>(_httpClientFactory, baseurl, "/api/Professor");
            //Rota igual a do API
            return lista;
        }

        public async Task<List<ProfessorCls>> BuscarProfessorsPorNome(string nomeProfessor)
        {
            //Rota igual a do API
            if (nomeProfessor != null)
            {
                List<ProfessorCls> lista = await ClasseClienteHttp.BuscarLista<ProfessorCls>(_httpClientFactory, baseurl, "/api/Professor/BuscarPorNome" + nomeProfessor);

                return lista;
            }
            else
            {

                return await BuscarProfessors();
            }
        }

        public async Task<ProfessorCls> BuscarProfessorsPorId(int idProfessor)
        {
            //Rota igual a do API
            return await ClasseClienteHttp.Buscar<ProfessorCls>(_httpClientFactory, baseurl, "/api/Professor/BuscarPorID" + idProfessor);

        }


        //Exclui usuário por ID
        public async Task<int> ExcluirProfessorPorId(int id)
        {

            return await ClasseClienteHttp.Excluir(_httpClientFactory, baseurl, "/api/Professor/ExcluirProfessor" + id);

        }

        //Adicionar ou alterar usuário
        public async Task<int> AdiconarProfessor(ProfessorCls Professor)
        {
            Professor.DataNascimentoProfessor = Convert.ToDateTime(Professor.DataNascimentoProfessorStr);
            return await ClasseClienteHttp.Adicionar<ProfessorCls>(_httpClientFactory, baseurl, "/api/Professor/AdicionarProfessor", Professor);

        }

    }
}
