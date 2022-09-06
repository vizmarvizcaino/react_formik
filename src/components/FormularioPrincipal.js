import { React, useState } from 'react'
import {
  Formulario, Label, ContenedorTerminos, ContenedorBotonCentrado, Boton, MensajeExito,
  MensajeError
} from '../elementos-formulario/Formularios';
import Inputs from '../components/Inputs';



const FormularioPrincipal = () => {
  const [usuario, setUsuario] = useState({ campo: '', valido: 'true' })
  const [nombre, setNombre] = useState({ campo: '', valido: null })
  const [password, setPassword] = useState({ campo: '', valido: null })
  const [password2, setPassword2] = useState({ campo: '', valido: null })
  const [correo, setCorreo] = useState({ campo: '', valido: null })
  const [telefono, setTelefono] = useState({ campo: '', valido: null })
  const [terminos, setTerminos] = useState(false)
  const [formularioValido, setformularioValido] = useState(null)

  const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
  }

  const validarPassword2 = () => {
    if (password.campo.length > 0) {
      if (password.campo !== password2.campo) {
        setPassword2((prevState) => {
          return {
            ...prevState,
            valido: 'false'
          }
        })
      } else {
        setPassword2((prevState) => {
          return {
            ...prevState,
            valido: 'true'
          }
        })
      }

    }
  }

  const onChangeTerminos = (e) => {
    setTerminos(e.target.checked)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (
      usuario.valido === 'true' &&
      nombre.valido === 'true' &&
      password.valido === 'true' &&
      password2.valido === 'true' &&
      correo.valido === 'true' &&
      telefono.valido === 'true' &&
      terminos
    ) {
      setformularioValido(true)
      setUsuario({ campo: '', valido: '' })
      setNombre({ campo: '', valido: '' })
      setPassword({ campo: '', valido: '' })
      setPassword2({ campo: '', valido: '' })
      setCorreo({ campo: '', valido: '' })
      setTelefono({ campo: '', valido: '' })
    } else {
      setformularioValido(false)
    }

  }

  return (
    <main>
      <Formulario action="" onSubmit={onSubmit}>
        <Inputs
          estado={usuario}
          cambiarEstado={setUsuario}
          tipo='text'
          label='Usuario'
          placeholder='john123'
          name='usuario'
          leyenda='El usuario tiene que ser de 4 a 16 digitos y solo puede contener numeros, letras y guion bajo.'
          expresionesRegulares={expresiones.usuario}
        />

        <Inputs
          estado={nombre}
          cambiarEstado={setNombre}
          tipo='text'
          label='Nombre'
          placeholder='john Doe'
          name='usuario'
          leyenda='El nombre solo puede contener letras y espacios.'
          expresionesRegulares={expresiones.nombre}
        />

        <Inputs
          estado={password}
          cambiarEstado={setPassword}
          tipo='password'
          label='contarsena'
          placeholder='john Doe'
          name='password1'
          leyenda='La contrasena tiene que ser de 4 a 12 digitos'
          expresionesRegulares={expresiones.password}
        />

        <Inputs
          estado={password2}
          cambiarEstado={setPassword2}
          tipo='password'
          label='Repetir Contarsena'
          name='password2'
          leyenda='Ambas contrasena deben ser iguales.'
          funcion={validarPassword2}
        />

        <Inputs
          estado={correo}
          cambiarEstado={setCorreo}
          tipo='email'
          label='Correo Electronico'
          placeholder='john@correo.com'
          name='correo'
          leyenda='El correo electronico no debe tener espacios ni caracteres especiales.'
          expresionesRegulares={expresiones.correo}
        />

        <Inputs
          estado={telefono}
          cambiarEstado={setTelefono}
          tipo='text'
          label='Telefono'
          placeholder='34325354353453'
          name='telefono'
          leyenda='El numero de telefono debe tener minimo 7 caracteres y maximo 14.'
          expresionesRegulares={expresiones.telefono}
        />
        <div>
        <ContenedorTerminos >
          <Label>
            <input type="checkbox"
              name="terminos" id="terminos"
              checked={terminos}
              onChange={onChangeTerminos}
            />
            Acepto los Terminos y Condiciones
          </Label>
        </ContenedorTerminos>
        </div>

        {formularioValido === false && <MensajeError>
          <p>
            <b>Error:</b> Por favor rellene el formulario correctamente
          </p>
        </MensajeError>}

        <ContenedorBotonCentrado>
          <Boton type='submit'>Enviar</Boton>
          {formularioValido === true && <MensajeExito>El fomrulario se envio exitosamente</MensajeExito>}
        </ContenedorBotonCentrado>

      </Formulario>

    </main>
  )
}

export default FormularioPrincipal