import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Detalles, Factura, Producto } from '../Model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosApi {
  private apiUrl = 'https://api.cafebritt.com/develop/test/functions/api.cfc?method=';

  constructor(private http: HttpClient) { }


    crearFactura(factura:Factura, token:string):Observable<any> {
        return this.http.get(`${this.apiUrl}CreaFactura&token=`+token+`&numero_factura=`+factura.numero_factura+`&fecha=`+factura.fecha);
    }
    obtenerFactura(factura:Factura, token:string):Observable<any> {
        return this.http.get(`${this.apiUrl}ObtieneFactura&token=`+token+`&numero_factura=`+factura.numero_factura);
    }
    cargarProductos(token:string):Observable<any> {
        return this.http.get(`${this.apiUrl}BuscarProducto&token=`+token+`&producto=chocolate`);
    }
    agregaDetalle(detalle:Detalles, factura:Factura, token:string):Observable<any> {
        return this.http.get(`${this.apiUrl}AgregaDetalle&token=`+token+`&codigo_articulo=`+detalle.codigo_articulo+`&cantidad=`+detalle.cantidad+`&numero_factura=`+factura.numero_factura);
    }
    borrarDetalle(detalle:Detalles, factura:Factura, token:string):Observable<any> {
        return this.http.get(`${this.apiUrl}BorrarDetalle&token=`+token+`&linea=`+detalle.linea+`&cantidad=`+detalle.cantidad+`&numero_factura=`+factura.numero_factura);
    }


}