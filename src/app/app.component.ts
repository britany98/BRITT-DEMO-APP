import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Detalles, Factura, Producto } from './Model';
import { ServiciosApi } from './services/servicios.api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class DemoComponent implements OnInit {
  title = 'BRITT-DEMO-app';

  private apiUrl = 'https://api.cafebritt.com/develop/test/functions/api.cfc?method=';

  demoForm: FormGroup;
  productoForm: FormGroup;
  facturaForm: FormGroup;
  token: string = "";
  public listDetalles: Array<Detalles>=[];
  public listProductos: Array<Producto>=[];


  public factura: Factura = new Factura();
  public detalle: Detalles = new Detalles();
  
  constructor(private fb: FormBuilder, private serviciosApi: ServiciosApi, private http: HttpClient){
    this.demoForm = this.fb.group({
      usuario: [''],
      numero_factura: [''],
      fecha: [''],
      total: ['']

    })
    this.facturaForm = this.fb.group({
      numero_factura: [''],
      fecha: ['']

    })
    this.productoForm = this.fb.group({
      articulo: [''],
      cantidad: [''],

    })
  }


  ngOnInit(): void {
    this.token = '8545421223';
    
  }

  crearFactura(){
    this.factura.numero_factura = this.facturaForm.value.numero_factura;
    this.factura.fecha = this.facturaForm.value.fecha;
    console.log(this.factura.numero_factura)
    console.log(this.factura.fecha)

    this.serviciosApi.crearFactura(this.factura, this.token).subscribe(res =>{
      this.factura.numero_factura = res.NUMERO_FACTURA;
      Swal.fire(res.ALERTA);
      this.obtenerFactura(this.factura);
      
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se ha podido crear la factura'
    })
    })

  }

  obtenerFactura(factura:any){
    this.serviciosApi.obtenerFactura(factura, this.token).subscribe(res2 =>{
      this.factura.numero_factura = factura.numero_factura;
      this.factura.fecha = factura.fecha;
      this.factura.usuario = res2.FACTURA.USUARIO;
      this.factura.total = res2.FACTURA.TOTAL;

      this.demoForm.controls['usuario'].setValue(this.factura.usuario);
      this.demoForm.controls['numero_factura'].setValue(this.factura.numero_factura);
      this.demoForm.controls['fecha'].setValue(this.factura.fecha);
      this.demoForm.controls['total'].setValue(this.factura.total);
    }, error => {
      console.log(error);
    })
  }


  cargarProductos() {

    this.serviciosApi.cargarProductos(this.token).subscribe(res =>{
      for(let i of res.PRODUCTOS){
        this.listProductos.push(i)
        
      }
      console.log(this.listProductos)
    }, error => {
      console.log(error);

    })

  }

  agregaDetalle() {
    // console.log(this.factura)
    
    this.detalle.codigo_articulo = this.productoForm.value.articulo;
    this.detalle.cantidad = this.productoForm.value.cantidad;

    this.serviciosApi.agregaDetalle(this.detalle, this.factura, this.token).subscribe(res =>{
      
    }, error => {
      console.log(error);
    })
  }

  borrarDetalle() {

  }


}
