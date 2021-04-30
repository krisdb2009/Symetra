using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace SymetraServer
{
    public class SymetraServer : BackgroundService
    {
        private readonly ILogger<SymetraServer> _logger;

        public SymetraServer(ILogger<SymetraServer> logger)
        {
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);

                
                //System.Management.Automation.PowerShell.Create();
                HttpListener hl = new HttpListener();
                hl.Prefixes.Add("http://*:8089/Symetra/Clients/WS/");
                hl.Prefixes.Add("http://*:8089/Symetra/Web/WS/");
                hl.Start();
                while(true)
                {
                    HttpListenerContext con = hl.GetContext();
                    await con.AcceptWebSocketAsync("SymetraTalkV0");
                }


                //await Task.Delay(1000, stoppingToken);
                
            }
        }
    }
}
