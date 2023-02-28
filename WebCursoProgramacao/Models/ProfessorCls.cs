namespace WebCursoProgramacao.Models
{
    public class ProfessorCls
    {
        public int IdProfessor { get; set; }

        public string NomeProfessor { get; set; } = "";

        public string SobrenomeProfessor { get; set; } = "";

        public string? CpfProfessor { get; set; } = "";

        public string? CelularProfessor { get; set; } = "";

        public string? EnderecoProfessor { get; set; } = "";

        public DateTime? DataNascimentoProfessor { get; set; } = null!;

        public string? DataNascimentoProfessorStr { get; set; } = "";
    }
}
