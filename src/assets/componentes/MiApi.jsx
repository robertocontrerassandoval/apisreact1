import React, { useState, useEffect } from 'react';
import Buscador from './Buscador';
import { Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';   

   



const MiApi = () => {
    const [feriados, setFeriados] = useState([]);
    const [feriadosFiltrados, setFeriadosFiltrados] = useState([]);
    const [buscando, setBuscando] = useState('');
    const [ordenAscendente, setOrdenAscendente] = useState('true');

     // 1 - Función que consulta la API
     useEffect(() => {
        const consultarApi = async () => {
        
                const url = "https://api.victorsanmartin.com/feriados/en.json#";
                const respuesta = await fetch(url);
                const dato = await respuesta.json();
                setFeriados(dato.data) ;  // Con setInfo actualizamos el estado
                setFeriadosFiltrados(dato.data); // Con setInfo actualizamos el estado
             
            };
        
            consultarApi();
        },[]  );   // el callBack se llama solo en el montaje erreglo vacio no depende de nada



// funcion que filtra datos
    useEffect(() => {

        const feriadosFiltrados = feriados.filter(feriado => feriado.title.toLowerCase().includes(buscando.toLowerCase()) ||
        feriado.date.toLowerCase().includes(buscando.toLowerCase() ||
        feriado.type.toLowerCase().includes(buscando.toLowerCase())));
        setFeriadosFiltrados(feriadosFiltrados);
    }, [buscando, feriados]); //busqueda con condicion de dependencia, solo
    // se ejecuta cuando se llame a las variables de estado buscando y feriados


    const filtradoSort = () => {
        const sortFeriados = [...feriadosFiltrados].sort((a, b) => {
            if (ordenAscendente) {
                return a.title.localeCompare(b.title);
            } else {
                return b.title.localeCompare(a.title);
            }
        });
        setFeriadosFiltrados(sortFeriados);
        setOrdenAscendente(!ordenAscendente);
    };




    return (
        <div className="principal">
    
     

        <Table striped bordered hover>
            <thead>
                <tr>
                    <th >Fecha</th>
                    <th >Nombre</th>
                    <th >Tipo</th>
                </tr>
            </thead>
            <tbody>
                {feriadosFiltrados.map(feriado => (
                    <tr key={feriado.title}>
                        <td >{feriado.date}</td>
                        <td >{feriado.title}</td>
                        <td >{feriado.type}</td>
                    </tr>
                ))} 
            </tbody>
        </Table>

        <Buscador setBuscando={setBuscando} />
        <Button 
        variant="primary" 
        onClick={filtradoSort}>
        Ordenar listado
        </Button>

    </div>

    );
}

export default MiApi;
 