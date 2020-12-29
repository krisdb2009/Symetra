using Microsoft.AspNet.SignalR;
using System.Collections.Generic;
using System.Diagnostics;
using System.DirectoryServices;
using System.DirectoryServices.AccountManagement;
using System;
using System.Reflection;

namespace SymetraService
{
    public class Symetra : Hub
    {
        public UserPrincipal ConnectedUser;
        public void Connected(string Page)
        {
            if (Page == "") Page = "Home";
            ConnectedUser = UserPrincipal.FindByIdentity(new PrincipalContext(ContextType.Domain), Context.User.Identity.Name);
            DirectorySearcher ds = new DirectorySearcher("(objectSID=" + ConnectedUser.Sid + ")", new string[] {"thumbnailPhoto"});
            SearchResult sr = ds.FindOne();
            Clients.Caller.gatherUserData(ConnectedUser.SamAccountName, ConnectedUser.DisplayName, sr.Properties["thumbnailPhoto"]);
            Clients.Caller.setPage(Page);
        }
        public Dictionary<string, string> GetSymetraStats()
        {
            AssemblyName assemblyName = Assembly.GetExecutingAssembly().GetName();
            return new Dictionary<string, string>()
            {
                { "Version",  assemblyName.Version.ToString() },
                { "Author",  "Dylan Bickerstaff" },
                { "ServerName",  Environment.MachineName },
                { "ServerTime",  DateTime.Now.ToString() },
                { "UpTime",  Process.GetCurrentProcess().StartTime.Subtract(DateTime.Now).ToString() },
                { "Connections",  "0" }
            };
        }
    }
}