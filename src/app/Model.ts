export class Detalles {
    precio: number = 0;    
    codigo_articulo: string = "";
    articulo: string = "";
    cantidad: string = ""; 
    linea: number = 0;
    total_linea: number = 0;
}

export class Factura {
    total: number = 0;    
    fecha: string = "";
    numero_factura: string = "";
    usuario: string = ""; 
}

export class Producto{
    precio: number = 0;    
    codigo_articulo: string = "";
    descripcion: string = "";
}