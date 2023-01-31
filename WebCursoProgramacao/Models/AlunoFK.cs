namespace WebCursoProgramacao.Models
{
    public class AlunoFK
    {
        public int IdAluno { get; set; }

        public string NomeAluno { get; set; } = null!;

        public string? CpfAluno { get; set; }

        public string? CelularAluno { get; set; }
    }
}
