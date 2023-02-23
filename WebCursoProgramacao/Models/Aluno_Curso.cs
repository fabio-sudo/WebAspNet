namespace WebCursoProgramacao.Models
{
    public class Aluno_Curso
    {

        public int IdAlunoCurso { get; set; }

        public int OrdemMatricula { get; set; }

        public AlunoCls alunoCls { get; set; } = null!;

        public CursoCls cursoCls { get; set; } = null!;

        public ProfessorCls professorCls { get; set; } = null!;

        public PeriodoCls periodoCls { get; set; } = null!;

        public string? DiaSemanaCurso { get; set; }

        public string? StatusCurso { get; set; }


    }
}
