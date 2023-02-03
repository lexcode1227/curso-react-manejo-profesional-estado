import React from "react";

const SECURITY_CODE = "paradigma"

function UseState({ name }) {
  const [state, setState] = React.useState({
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  })

  const onConfirm = () => {
    setState({
        ...state,
        error: false,
        loading: false,
        confirmed: true,
        value:"", //lo agregué para limpiar el valor del input al avanzar
    })
  }
  const onError = () => {
    setState({
        ...state,
        error: true,
        loading: false,
    })
  }
  const onWrite = (newValue) => {
    setState({
        ...state,
        value: newValue,
    })
  }
  const onCheck = () => {
    setState({
        ...state,
        loading: true,
    })
  }
  const onDelete = () => {
    setState({
        ...state,
        deleted: true,
    })
  }
  const onReset = () => {
    setState({
        ...state,
        confirmed: false,
        deleted: false,
    })
  }

  React.useEffect( () => {
    if (!!state.loading) {
        // setState({error: false})
        setTimeout( () => {
            if(state.value === SECURITY_CODE) {
                console.log("Codigo Correcto");
                onConfirm()
            } else {
                onError()
            }
        }, 2000)
    }
  }, [state.loading])

  if (!state.deleted && !state.confirmed) {
    return (
        <div>
          <h2>Eliminar {name}</h2>
    
          <p>Por favor, escriba el código de seguridad.</p>
    
          {(state.error && !state.loading) && (<p>Error: el código es incorrecto </p>)}
    
          {state.loading && (<p>Cargando... </p>)}
    
          <input 
            value={state.value}
            placeholder="Codigo de seguridad"
            onChange={(e)=>{
                onWrite(e.target.value)
            }}
           />
          <button 
            onClick={() => {
                onCheck()
            }}> 
            Comprobar 
            </button>
        </div>
      );
  } else if (!!state.confirmed && !state.deleted) {
    return (
        <React.Fragment>
            <p>Pedimos confirmacion, ¿estás seguro?</p>

            <button
                onClick={()=>{
                    onDelete()
                }}
            >
                Si, eliminar
            </button>
            <button
                onClick={()=>{
                    onReset()
                }}
            >No, me arrepentí</button>
        </React.Fragment>
    )
  } else {
    return(
        <React.Fragment>
            <p>Eliminado con exito</p>

            <button
                onClick={()=>{
                    onReset()
                }}
            >
                Resetear, volver a cargar
            </button>
        </React.Fragment>
    )
  }
}

export { UseState }