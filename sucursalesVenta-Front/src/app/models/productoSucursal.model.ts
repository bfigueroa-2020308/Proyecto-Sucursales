export class ProductoSucursalModel{
    constructor(
        public producto : string,
        public stock : number,
        public ventas : number,
        public sucursal : string
    ){}
}