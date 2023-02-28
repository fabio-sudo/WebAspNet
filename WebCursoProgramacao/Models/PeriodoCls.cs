namespace WebCursoProgramacao.Models
{
    public class PeriodoCls
    {
        public int IdPeriodo { get; set; }


        public string NomePeriodo { get; set; } = "";

        public DateTime? HorarioInicial { get; set; } = null!;

        public DateTime? HorarioFinal { get; set; } = null!;

        public string? HorarioInicialStr { get; set; } = "";

        public string? HorarioFinalStr { get; set; } = "";
    }
}
