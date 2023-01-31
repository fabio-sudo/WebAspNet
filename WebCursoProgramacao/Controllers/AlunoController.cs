using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http;
using System.Runtime.Intrinsics.Arm;
using WebCursoProgramacao.Models;

namespace WebCursoProgramacao.Controllers
{
    public class AlunoController : Controller
    {
        private string baseurl;
        private readonly IHttpClientFactory _httpClientFactory;
        public AlunoController(IConfiguration configuration, IHttpClientFactory httpClientFactory)
        {

            baseurl = configuration["baseurl"];
            _httpClientFactory = httpClientFactory;
        }
        public IActionResult Index()
        {
            return View();
        }

        //Utilizar nossa classe que retorna lista genérica -> ClassseClienteHTTP

        public async Task<List<AlunoCls>> BuscarAlunos()
        {
            List<AlunoCls> lista = await ClasseClienteHttp.BuscarLista<AlunoCls>(_httpClientFactory, baseurl, "/api/Aluno");
            lista.Where(p => p.imgStr == "").ToList().ForEach(p => p.imgStr = "/img/nofoto.jpg");
            //Rota igual a do API
            return lista;
        }

        public async Task<List<AlunoCls>> BuscarAlunosPorNome(string nomeAluno)
        {
            //Rota igual a do API
            if (nomeAluno != null)
            {
                List<AlunoCls> lista = await ClasseClienteHttp.BuscarLista<AlunoCls>(_httpClientFactory, baseurl, "/api/Aluno/BuscarPorNome" + nomeAluno);
                lista.Where(p => p.imgStr == "").ToList().ForEach(p => p.imgStr = "/img/nofoto.jpg");

                return lista;
            }
            else
            {

                return await BuscarAlunos();
            }
        }

        public async Task<AlunoCls> BuscarAlunosPorId(int idAluno)
        {
            //Rota igual a do API
            return await ClasseClienteHttp.Buscar<AlunoCls>(_httpClientFactory, baseurl, "/api/Aluno/BuscarPorID" + idAluno);

        }

        //Exclui usuário por ID
        public async Task<int> ExcluirAlunoPorId(int id)
        {

            return await ClasseClienteHttp.Excluir(_httpClientFactory, baseurl, "/api/Aluno/ExcluirAluno" + id);

        }

        //Adicionar ou alterar usuário
        public async Task<int> AdiconarAluno(AlunoCls aluno, IFormFile imgEnviar)
        {

            //Convertendo IMG
            byte[] buffer = new byte[0];
            string imgNome = "";

            if (imgEnviar != null)
            {
                using (MemoryStream ms = new MemoryStream())
                {

                    imgEnviar.CopyTo(ms);
                    imgNome = imgEnviar.FileName;
                    buffer = ms.ToArray();

                }

            }

            aluno.NomeImg = imgNome;
            aluno.Img = buffer;

            aluno.DataNascimentoAluno = Convert.ToDateTime(aluno.DataNascimentoAlunoStr);
            return await ClasseClienteHttp.Adicionar<AlunoCls>(_httpClientFactory, baseurl, "/api/Aluno/AdicionarAluno", aluno);

        }


    }
}
