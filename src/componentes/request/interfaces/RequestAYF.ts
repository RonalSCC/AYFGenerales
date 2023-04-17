import IRespuestaGeneral from "./IRespuestaGeneral";
import SendRequestAxios from "./SendRequestAxios";

export default interface RequestAYF {
    post(DatosEnvio:SendRequestAxios): Promise<IRespuestaGeneral>,
    get(DatosEnvio:SendRequestAxios): Promise<IRespuestaGeneral>,
    delete(DatosEnvio:SendRequestAxios): Promise<IRespuestaGeneral>,
    put(DatosEnvio:SendRequestAxios): Promise<IRespuestaGeneral>,
}