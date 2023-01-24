namespace WebCursoProgramacao.Models
{
    public class PeriodoCls
    {
        public int IdPeriodo { get; set; }

        public string NomePeriodo { get; set; } = null!;

        public DateTime? HorarioInicial { get; set; }

        public DateTime? HorarioFinal { get; set; }

        public string? HorarioInicialStr { get; set; } = "";

        public string? HorarioFinalStr { get; set; } = "";
    }
}
