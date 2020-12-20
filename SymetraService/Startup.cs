using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(SymetraService.Startup))]

namespace SymetraService
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR("/signalr", new HubConfiguration());
        }
    }
}
