﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace ProduccionBack.Models;

public partial class Posicion
{
    public int IdPosicion { get; set; }

    public string Posicion { get; set; }

    public virtual ICollection<Jugador> Jugadores { get; set; } = new List<Jugador>();
}