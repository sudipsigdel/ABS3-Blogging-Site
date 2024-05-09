
namespace ABS3.Hub
{
    using Microsoft.AspNetCore.SignalR;
    public class NotificationHub : Hub
    {
        public async Task SendNotification(String user, String message)
        {
            await Clients.All.SendAsync("ReceiveNotification", user, message);
            
        }
    }
}
