using Microsoft.AspNet.SignalR;
using System.Diagnostics;
using System.DirectoryServices;
using System.DirectoryServices.AccountManagement;

namespace SymetraService
{
    public class Symetra : Hub
    {
        public UserPrincipal ConnectedUser;
        public Symetra()
        {
            Debug.WriteLine("New connection.");
        }
        public void Connected()
        {
            ConnectedUser = UserPrincipal.FindByIdentity(new PrincipalContext(ContextType.Domain), Context.User.Identity.Name);
            DirectorySearcher ds = new DirectorySearcher("(objectSID=" + ConnectedUser.Sid + ")", new string[] {"thumbnailPhoto"});
            SearchResult sr = ds.FindOne();
            Clients.Caller.gatherUserData(ConnectedUser.SamAccountName, ConnectedUser.DisplayName, sr.Properties["thumbnailPhoto"]);
        }
    }
}