import { Stack, Typography } from '@mui/material'
import Image from 'mui-image'
import React from 'react'

export interface SinInformacionProps {
    message: string
}

const SinInformacion = ({ message }: SinInformacionProps) => {

    return (
        <Stack direction="row" width="100%" height={"100%"} bgcolor={"white"}>
            <Stack direction="column" width="100%" paddingY={5} paddingX={3} gap={1.5} justifyContent="center" alignItems="center">
                <Stack direction="row" width="100%" justifyContent="center">
                    <Image fit='cover' width="22%" src="Imagenes/Terceros/SinInformacion.svg" duration={0}/>
                </Stack>

                <Typography variant='h6'  color="text.primary">
                    No hay información
                </Typography>

                <Typography variant='body2' maxWidth="60%" textAlign="center" color="text.secondary">
                    {message}
                </Typography>
            </Stack>
        </Stack>
    )
}

export default SinInformacion