namespace WebCursoProgramacao.Models
{
    public class AlunoCls
    {
        public int IdAluno { get; set; }

        public string NomeAluno { get; set; } = null!;

        public string SobrenomeAluno { get; set; } = null!;

        public string? CpfAluno { get; set; }

        public string? CelularAluno { get; set; }

        public string? EnderecoAluno { get; set; }

        public DateTime? DataNascimentoAluno { get; set; }

        public string? DataNascimentoAlunoStr { get; set; }

        public string? StatusAluno { get; set; } = "Espera";

        public string imgStr { get; set; } = "";

        public string? NomeImg { get; set; } = "";

        public byte[]? Img { get; set; }
    }
}
