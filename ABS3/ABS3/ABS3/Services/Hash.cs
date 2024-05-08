using System.Security.Cryptography;
using System.Text;

namespace ABS3.Services
{
    public class Hash
    {

        private static byte[] GenerateSalt(int length)
        {
            byte[] salt = new byte[length];
            return salt;
        }

        // Method to hash a password with salt
        public static string HashPassword(string password)
        {
            // Generate a random salt
            byte[] salt = GenerateSalt(16); // You can adjust the salt length as needed

            // Convert the password string to byte array
            byte[] passwordBytes = Encoding.UTF8.GetBytes(password);

            // Combine the password bytes with the salt
            byte[] combinedBytes = new byte[passwordBytes.Length + salt.Length];
            Array.Copy(passwordBytes, combinedBytes, passwordBytes.Length);
            Array.Copy(salt, 0, combinedBytes, passwordBytes.Length, salt.Length);

            // Compute the hash value
            using (var sha256 = new SHA256Managed())
            {
                byte[] hashedBytes = sha256.ComputeHash(combinedBytes);
                // Convert the byte array to a hexadecimal string
                return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            }
        }
    }
}
