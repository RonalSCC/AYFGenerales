import ReactDOM from 'react-dom/client';
import {Alert, AlertTitle, CircularProgress, Stack, Typography } from '@mui/material';
import AYF from '../_AYF_/ayf';
import axios from 'axios';
import React from 'react';
import { IErrorGeneral, IRespuestaGeneral, RequestAYF } from './interfaces';

const alertDiv = ReactDOM.createRoot(
    document.getElementById('alerts') as HTMLElement
);

const loaderDiv = ReactDOM.createRoot(
    document.getElementById('loaderAyf') as HTMLElement
);


const axiosRequest = axios.create({
    baseURL: AYF.BASE_URL
});


/**
 * @description Crea una solicitud REST
 * 
 * Loader: Se busca en el HTML un elemento con el id loaderAyf para renderizar el Loader
 * 
 * Alertas: Se busca en el HTML un elemento con el id alerts para renderizar las alertas de error
 */

export const SendRequest: RequestAYF = {
    async post(
        {
            showLoader = true,
            urlServicio,
            body,
            headers
        }
    ) {
        if (showLoader == true) {
            VerOcultarLoader(true);
        }

        return await ObtenerConfiguracionPromiseRespuesta(axiosRequest.post(
            urlServicio, 
            CambiarVaciosPorNull(body),
            {
                headers: getHeadersConToken(headers)
            }
        ), showLoader);
    },
    async get(
        {
            showLoader = true,
            urlServicio,
            body,
            headers
        }
    ) {
        if (showLoader == true) {
            VerOcultarLoader(true);
        }
        return await ObtenerConfiguracionPromiseRespuesta(axiosRequest.get(
            urlServicio, 
            {
                params: CambiarVaciosPorNull(body),
                headers: getHeadersConToken(headers)
            }
        ), showLoader);
    },
    async delete(
        {
            showLoader = true,
            urlServicio,
            body,
            headers
        }
    ) {
        if (showLoader == true) {
            VerOcultarLoader(true);
        }
        return await ObtenerConfiguracionPromiseRespuesta(axiosRequest.delete(
            urlServicio,
            {
                params:CambiarVaciosPorNull(body),
                headers: getHeadersConToken(headers)
            }
        ), showLoader);
    },
    async put(
        {
            showLoader = true,
            urlServicio,
            body,
            headers
        }
    ) {
        if (showLoader == true) {
            VerOcultarLoader(true);
        }
        return await ObtenerConfiguracionPromiseRespuesta(axiosRequest.put(
            urlServicio,
            CambiarVaciosPorNull(body),
            {
                headers: getHeadersConToken(headers)
            }
        ), showLoader);
    },
}

const VerOcultarLoader = (estado:boolean)=>{
    if (loaderDiv) {
        if (estado) {
            loaderDiv.render(
                <Stack
                    itemID='Loader' 
                    zIndex={10000}  
                    position={"fixed"} 
                    height="100%"
                    width="100%" 
                    display={"none"} 
                    justifyContent="center" 
                    alignItems={"center"} 
                    sx={{
                    top:0,
                    }}>
                    <Stack sx={{opacity: 0.6}} position={"absolute"} height="100%" width="100%" bgcolor={"rgba(0,0,0,.3)"} >
                    
                    </Stack>
                    <CircularProgress sx={{position: "absolute"}}/>
                </Stack>
            )
        }else{
            loaderDiv.render("");
        }
    } 
}

const MostrarAlertasError = (errores:IErrorGeneral[]) =>{
    if (errores && errores.length > 0 && alertDiv) {
        alertDiv.render(errores.map((e,i) => 
            <Alert 
                key={i} 
                severity="warning"
                sx={{boxShadow:"0px 0px 1px rgba(0,0,0,.7)", paddingY:.5, paddingX: 2, alignItems: "center"}}
                onClose={() => {
                    errores.splice(i, 1);
                    MostrarAlertasError(errores);
                }}
            >
                <AlertTitle sx={{marginBottom: "0px"}}>
                    <Typography variant='caption'><strong>Conflictos en la ejecución</strong></Typography> 
                </AlertTitle>
                <Typography variant='caption'>{e.codigo}: {e.descripcion}</Typography> 
            </Alert>
        ));
    }else{
        alertDiv.render("");
    }
}

const CambiarVaciosPorNull = (data:any)=> {
    let objectReturn:any = null;
    if (data) {
        objectReturn = {};
        for (let [key, value] of Object.entries(data)) {
            if (value === "") {
                value = null;
            }
            objectReturn[key] = value;
        }
    }
    return objectReturn;
}

const ObtenerConfiguracionPromiseRespuesta = (promise: Promise<any>, ShowLoader:boolean) => {
    return promise.then(function({data}:{data:IRespuestaGeneral}){
        return data;
    })
    .catch(function(error){
        let respuestaError:IRespuestaGeneral = error.response?.data  ? error.response?.data : {};
        if (respuestaError.errores && respuestaError.errores.length > 0) {
            MostrarAlertasError(error.response.data.errores);
        }else{
            if (respuestaError.codigo && respuestaError.descripcion) {
                MostrarAlertasError([{
                    codigo: `${respuestaError.codigo}`,
                    descripcion: respuestaError.descripcion
                }]);
            }
        }
        return respuestaError;
    })
    .finally(function(){
        if (ShowLoader == true) {
            VerOcultarLoader(false);
        }
    });
}

const getHeadersConToken = (headers?: any) => {
    if (AYF && AYF.TOKEN) {
        if (headers) {
            headers.Authorization = AYF.TOKEN;
        }else{
            headers = {
                Authorization: AYF.TOKEN
            }
        }
    }
    return headers;
}

export default SendRequest;