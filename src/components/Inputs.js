import React from 'react'
import { Label, GrupoInput, Input, LeyenedaError, IconValidacion } from '../elementos-formulario/Formularios'

const Inputs = ({ estado, cambiarEstado, tipo, label, placeholder, name, leyenda, expresionesRegulares, funcion }) => {
  const onChange = (e)=> {
    console.log(e.target.value)
    cambiarEstado({...estado, campo: e.target.value})
  }

  const validacion = (e)=> {
    if(expresionesRegulares){
      if(expresionesRegulares.test(estado.campo)){
        cambiarEstado({...estado, valido: 'true'})
      } else {
        cambiarEstado({...estado, valido: 'false'})
      }
    }
    if(funcion){
      funcion()
    }
  }


  return (
    <div>
        <Label htmlFor={name} valido={estado.valido}>{label}</Label>
        <GrupoInput>
            <Input 
            type={tipo} 
            placeholder={placeholder} 
            id={name} 
            value={estado.campo}
            onChange={onChange}
            onKeyUp={validacion}
            onBlur={validacion}
            valido={estado.valido}
            />
            <IconValidacion
            icon={estado.valido === 'true' ? 'O' : 'X'}
            valido={estado.valido}
            >X</IconValidacion>
        </GrupoInput>
        <LeyenedaError valido={estado.valido}>{leyenda}</LeyenedaError>
    </div>
   
  )
}
export default Inputs
