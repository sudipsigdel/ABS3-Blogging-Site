namespace ABS3.DTO
{
    public class BlogDto
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string Category { get; set; }
        public IFormFile BlogImage { get; set; }
    }
}
