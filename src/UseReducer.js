import React from "react";

const SECURITY_CODE = "paradigma"

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const onConfirm = () => {
    dispatch ({ type: actionTypes.confirm})
  }
  const onError = () => {
    dispatch ({ type: actionTypes.error})
  }
  const onWrite = ({ target: { value }}) => {
    dispatch ({ type: actionTypes.write, payload: value})
  }
  const onCheck = () => {
    dispatch ({ type: actionTypes.check})
  }
  const onDelete = () => {
    dispatch ({ type: actionTypes.delete})
  }
  const onReset = () => {
    dispatch ({ type: actionTypes.reset})
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
            //forma mas sencilla
            onChange={onWrite}
            // onChange={(e)=>{
            //     dispatch({ type: actionTypes.write, payload: e.target.value})
            // }}
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

export { UseReducer }

const initialState = {
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
}

const actionTypes = {
    confirm: "CONFIRM", 
    error: "ERROR",
    delete: "DELETE",
    write: "WRITE",
    check: "CHECK",
    reset: "RESET",
}

const reducer = (state,action) => {
    switch (action.type) {
        case actionTypes.confirm:
            return {
                ...state,
                error: false,
                loading: false,
                confirmed: true,
                value:"",
            }
        case actionTypes.error:
            return {
                ...state,
                error: true,
                loading: false,
            }
        case actionTypes.check:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.write:
            return {
                ...state,
                value: action.payload,
            }
        case actionTypes.delete:
            return {
                ...state,
                deleted: true,
            }
        case actionTypes.reset:
            return {
                ...state,
                confirmed: false,
                deleted: false,
            }
        default:
            return {
                ...state,
            }
    }
}