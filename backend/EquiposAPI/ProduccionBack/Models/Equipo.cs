﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace ProduccionBack.Models;

public partial class Equipo
{
    public int IdEquipo { get; set; }

    public string NombreEquipo { get; set; }

    public int? DirectorTecnico { get; set; }

    public virtual Persona DirectorTecnicoNavigation { get; set; }

    public virtual ICollection<Jugador> Jugadores { get; set; } = new List<Jugador>();
}