import IErrorGeneral from "./IErrorGeneral";
import IPaginacion from "./IPaginacion";

export default interface IRespuestaGeneral {
    codigo: number,
    datos: any|Array<any>,
    descripcion:string,
    errores?:null|Array<IErrorGeneral>,
    ok: boolean,
    paginacion?:IPaginacion
};

