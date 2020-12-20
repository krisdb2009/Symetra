using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Timers;
using System.Diagnostics;
using System.Threading.Tasks;

namespace SymetraService
{
    public class Symetra : Hub
    {
        public Symetra()
        {
            Debug.WriteLine("New connection.");
        }
    }
}