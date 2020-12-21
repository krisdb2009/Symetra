using Microsoft.AspNet.SignalR;
using System.Diagnostics;

namespace SymetraService
{
    public class Symetra : Hub
    {
        public Symetra()
        {
            Debug.WriteLine("New connection.");
        }
        public void Connected()
        {
            Clients.Caller.debug("Welcome, " + Context.User.Identity.Name + "!");
        }
    }
}