namespace WebCursoProgramacao.Models
{
    public class AlunoCurso
    {
        public int IdAlunoCurso { get; set; }

        public int OrdemMatricula { get; set; }

        //----------------------Aluno
        public int idAluno { get; set; }

        public string? nomeAluno { get; set; }
        public string? CpfAluno { get; set; }
        public string? CelularAluno { get; set; }
        public string? imgStr { get; set; }

        //---------------------Professor
        public int idProfessor { get; set; }
        public string? nomeProfessor { get; set; }

        //---------------------Curso
        public int idCurso { get; set; }
        public string? nomeCurso { get; set; }

        //---------------------Periodo
        public int idPeriodo { get; set; }
        public string? nomePerido { get; set; }
        public DateTime? HorarioInicial { get; set; }

        public DateTime? HorarioFinal { get; set; }

        //--------------------Aluno Curso
        public string? DiaSemanaCurso { get; set; }

        public string? StatusCurso { get; set; }
    }
}
