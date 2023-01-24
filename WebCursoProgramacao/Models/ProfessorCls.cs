namespace WebCursoProgramacao.Models
{
    public class ProfessorCls
    {
        public int IdProfessor { get; set; }

        public string NomeProfessor { get; set; } = null!;

        public string SobrenomeProfessor { get; set; } = null!;

        public string? CpfProfessor { get; set; }

        public string? CelularProfessor { get; set; }

        public string? EnderecoProfessor { get; set; }

        public DateTime? DataNascimentoProfessor { get; set; }

        public string? DataNascimentoProfessorStr { get; set; }
    }
}
