import React from "react";

const ComponenteBoton = () => {
    const [counter, setCounter] = React.useState(0);

    return (
        <div>
        <button
                onClick = {()=> setCounter(prev => prev+1)}>
                Mira mi React {counter}!
        </button>
        </div>
    );
};

export default ComponenteBoton