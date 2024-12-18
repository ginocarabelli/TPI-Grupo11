﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ProduccionBack.Models;

public partial class Equipos
{
    public int IdEquipo { get; set; }

    public string NombreEquipo { get; set; }

    public int DirectorTecnico { get; set; }

    public int IdLiga { get; set; }

    public bool Alta { get; set; }

    public virtual Personas DirectorTecnicoNavigation { get; set; }
    public virtual ICollection<EquiposLigasInfo> EquiposLigasInfos { get; set; } = new List<EquiposLigasInfo>();

    public virtual Ligas IdLigaNavigation { get; set; }
    [JsonIgnore]
    public virtual ICollection<Jugadores> Jugadores { get; set; } = new List<Jugadores>();
    [JsonIgnore]
    public virtual ICollection<JugadoresLog> JugadoresLogs { get; set; } = new List<JugadoresLog>();
    [JsonIgnore]
    public virtual ICollection<Partidos> PartidoIdLocalNavigations { get; set; } = new List<Partidos>();
    [JsonIgnore]
    public virtual ICollection<Partidos> PartidoIdVisitanteNavigations { get; set; } = new List<Partidos>();
    [JsonIgnore]
    public virtual ICollection<Usuarios> Usuarios { get; set; } = new List<Usuarios>();
}