import { useState } from 'react';

const Buscador = ({ setBuscando }) => {
    const [ingresoValor, setIngresoValor] = useState('');

    const ingresoDeValor = (event) => {
        setIngresoValor(event.target.value);
        setBuscando(event.target.value);
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                className="input"
                placeholder="Buscar por nombre"
                value={ingresoValor}
                onChange={ingresoDeValor}
            />
        </div>
    );
};

export default Buscador;