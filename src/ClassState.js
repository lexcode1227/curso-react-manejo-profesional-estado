import React from "react";

const SECURITY_CODE = "paradigma"

class ClassState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      error: false,
      loading: false,
    };
  }

  componentDidUpdate(){
    console.log("actualizacion")

    if (!!this.state.loading) {
        setTimeout(()=>{
            if(SECURITY_CODE === this.state.value){
                this.setState({ error: false, loading: false })
            } else {
                this.setState({ error: true, loading: false })
            }
        }, 3000)
    }
}

  render() {
    return (
      <div>
        <h2>Eliminar {this.props.name} </h2>

        <p>Por favor, escriba el código de seguridad.</p>
        
        {(this.state.error && !this.state.loading) && (<p>Error: el código es incorrecto </p>)}

        {this.state.loading && (<p>Loading... </p>)}

        <input 
            placeholder="Codigo de seguridad" 
            value={this.state.value}
            onChange={(e)=>{
                this.setState({ value: e.target.value})
            }}
        />
        <button onClick={() => this.setState({ loading: true })}>
          Comprobar
        </button>
      </div>
    );
  }
}

export { ClassState };