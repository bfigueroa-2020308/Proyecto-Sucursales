import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { ProductoSucursalRestService } from 'src/app/services/productoSucursal/producto-sucursal-rest.service';
import { SucursalesRestService } from 'src/app/services/sucursalesRest/sucursales-rest.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit{
  
  productos:any
  sucursal : any
  hola :ChartConfiguration['data'] 

  constructor(
    private sucursalRes : SucursalesRestService,
    private productoRes : ProductoSucursalRestService
  ){
    this.sucursal = this.sucursalRes.obtenerSucursal()   
    this.productos =[]
    this.hola={
      datasets: [
        {
          data:[ 1 ],
          label: 'Series A',
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
        },
      ],
      labels:["hola"]
    }
  }
  


  ngOnInit(): void {
    this.obtenerProductos()
  }
  
  
  obtenerProductos(){
    this.productoRes.verProductos(this.sucursal).subscribe({
      next:(res:any)=>{this.productos = res.productos;
      console.log(this.productos)},
      error:(err)=>{console.log(err)}
    })
  }

  

  public lineChartData: ChartConfiguration['data'] = 
  {
    datasets: [
    {
      data:[175,150,200],
      label: 'Series A',
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      fill: 'origin',
    },
  ],
  labels:["ejemplo1", "ejemplo2", "ejemplo3"]
  
};

public lineChartOptions: ChartConfiguration['options'] = {
  elements: {
    line: {
      tension: 0.5
    }
  },
  scales: {
    // We use this empty structure as a placeholder for dynamic theming.
    x: {},
    'y-axis-0':
      {
        position: 'left',
      },
    'y-axis-1': {
      position: 'right',
      grid: {
        color: 'rgba(255,0,0,0.3)',
      },
      ticks: {
        color: 'red'
      }
    }
  },


};

public lineChartType: ChartType = 'line';


};

