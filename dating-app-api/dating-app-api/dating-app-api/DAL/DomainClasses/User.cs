using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace dating_app_api.DAL.DomainClasses
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? Firstname { get; set; } = "";
        public string? Lastname { get; set; } = "";
        [Required]
        public string? Username { get; set; }
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? Passphrase { get; set; }
        [Required]
        public int? Age { get; set; }
        public string? Gender { get; set; }
        [Required]
        public bool? Paid { get; set; }
        [Required]
        public bool? IsAdmin { get; set; }
    }
}
