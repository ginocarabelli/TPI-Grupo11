﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace ProduccionBack.Models;

public partial class Usuarios
{
    public int IdUsuario { get; set; }

    public string Usuario { get; set; }

    public string Contrasena { get; set; }

    public string Rol { get; set; }

    public int? IdEquipo { get; set; }

    public virtual EquipoS IdEquipoNavigation { get; set; }
}