using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http;
using System.Runtime.Intrinsics.Arm;
using WebCursoProgramacao.Models;


namespace WebCursoProgramacao.Controllers
{
    public class AlunoCursoController : Controller
    {

        private string baseurl;
        private readonly IHttpClientFactory _httpClientFactory;
        public AlunoCursoController(IConfiguration configuration, IHttpClientFactory httpClientFactory)
        {

            baseurl = configuration["baseurl"];
            _httpClientFactory = httpClientFactory;
        }

        public IActionResult Index()
        {
            return View();
        }

        //Métodos de Busca
        public async Task<List<AlunoCurso>> BuscarAlunoCurso()
        {
            List<AlunoCurso> lista = await ClasseClienteHttp.BuscarLista<AlunoCurso>(_httpClientFactory, baseurl, "/api/Aluno_Curso");
            lista.Where(p => p.imgStr == "").ToList().ForEach(p => p.imgStr = "/img/nofoto.jpg");
            //Rota igual a do API
            return lista;
        }

        //Metodo com objetos para testar
        public async Task<List<Aluno_Curso>> BuscarAluno_Curso()
        {
            List<Aluno_Curso> lista = await ClasseClienteHttp.BuscarLista<Aluno_Curso>(_httpClientFactory, baseurl, "/api/Aluno_Curso/BuscarAlunoCursoLista");
            //Rota igual a do API
            return lista;
        }

        public async Task<List<AlunoCurso>> BuscarAlunoCursoPorNome(string nomeAluno , int idCurso, int idPeriodo, int idProfessor)
        {
            List<AlunoCurso> lista = await ClasseClienteHttp.BuscarLista<AlunoCurso>(_httpClientFactory, baseurl, "/api/Aluno_Curso");
            lista.Where(p => p.imgStr == "").ToList().ForEach(p => p.imgStr = "/img/nofoto.jpg");


            if (idCurso != 0) {

                lista = lista.Where(p => p.idCurso == idCurso).ToList();
            }
            if (idPeriodo != 0)
            {

                lista = lista.Where(p => p.idPeriodo == idPeriodo).ToList();
            }
            if (idProfessor != 0)
            {

                lista = lista.Where(p => p.idProfessor == idProfessor).ToList();
            }

            if (nomeAluno != null) {
                lista = lista.Where(p => p.nomeAluno.Contains(nomeAluno)).ToList();
            }
            //Rota igual a do API
            return lista; 
        }

        //BuscaFK
        public async Task<List<AlunoFK>> BuscarAlunoFK()
        {
            List<AlunoFK> lista = await ClasseClienteHttp.BuscarLista<AlunoFK>(_httpClientFactory, baseurl, "/api/AlunoFK/BuscarAlunoFK");
            return lista;
        }

        public async Task<List<CursoFK>> BuscarCursoFK()
        {
            List<CursoFK> lista = await ClasseClienteHttp.BuscarLista<CursoFK>(_httpClientFactory, baseurl, "/api/CursoFK/BuscarCursoFK");
            return lista;
        }

        public async Task<List<PeriodoFK>> BuscarPeriodoFK()
        {
            List<PeriodoFK> lista = await ClasseClienteHttp.BuscarLista<PeriodoFK>(_httpClientFactory, baseurl, "/api/PeriodoFK/BuscarPeridoFK");
            return lista;
        }

        public async Task<List<ProfessorFK>> BuscarProfessorFK()
        {
            List<ProfessorFK> lista = await ClasseClienteHttp.BuscarLista<ProfessorFK>(_httpClientFactory, baseurl, "/api/ProfessorFK/BuscarProfessorFK");
            return lista;
        }
       
        //Cadastro
        public async Task<int> AdicionarAlunoCurso([FromBody]Aluno_Curso aluno_Curso)
        {

            return await ClasseClienteHttp.Adicionar<Aluno_Curso>(_httpClientFactory, baseurl, "/api/Aluno_Curso/AdicionarAlunoCurso", aluno_Curso);

        }

        public async Task<List<AlunoFK>> BuscarAlunosPorNomeFK(string nomeAluno)
        {
            //Rota igual a do API
            if (nomeAluno != null)
            {
                List<AlunoFK> lista = await ClasseClienteHttp.BuscarLista<AlunoFK>(_httpClientFactory, baseurl, "/api/AlunoFK/BuscarAlunoPorNomeFK" + nomeAluno);

                return lista;
            }
            else
            {

                return await BuscarAlunoFK();
            }
        }


    }
}
