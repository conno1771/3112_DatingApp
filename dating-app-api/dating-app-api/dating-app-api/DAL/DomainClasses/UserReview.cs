using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dating_app_api.DAL.DomainClasses
{
    public class UserReview
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public int Quality { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public string ReviewDate { get; set; }
    }
}
