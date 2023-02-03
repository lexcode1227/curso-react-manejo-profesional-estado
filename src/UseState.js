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

  console.log(state)

  React.useEffect( () => {
    if (!!state.loading) {
        // setState({error: false})
        setTimeout( () => {
            if(state.value === SECURITY_CODE) {
                console.log("Codigo Correcto");
                setState({
                    ...state,
                    error: false,
                    loading: false,
                    confirmed: true,
                    value:"", //lo agregué para limpiar el valor del input al avanzar
                })
            } else {
                setState({
                    ...state,
                    error: true,
                    loading: false,
                })
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
                setState({
                    ...state,
                    value: e.target.value
                })
            }}
           />
          <button 
            onClick={() => {
                setState({
                    ...state,
                    loading: true,
                })
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
                    setState({
                        ...state,
                        deleted: true,
                    })
                }}
            >
                Si, eliminar
            </button>
            <button
                onClick={()=>{
                    setState({
                        ...state,
                        confirmed: false,
                    })
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
                    setState({
                        ...state,
                        confirmed: false,
                        deleted: false,
                    })
                }}
            >
                Resetear, volver a cargar
            </button>
        </React.Fragment>
    )
  }
}

export { UseState }