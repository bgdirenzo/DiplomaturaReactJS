import { useState, useEffect } from "react";
import axios from 'axios'; /*Para las peticiones */
import NovedadesItem from '../components/Novedades/NovedadItem';
import '../styles/components/pages/novedadesPage.css';


const NovedadesPage = (props) => {

    const [loading, setLoading] = useState(false);
    const [novedades, setNovedades] = useState([]);

    useEffect(() => {
        const cargarNovedades = async () => {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/novedades');
            setNovedades(response.data);
            setLoading(false);
        };

        cargarNovedades();
    }, []);

    return (
        <section className="holder">
        <h2>Novedades</h2>
        
        {
            loading ? (
                <p>Cargando ..</p>
            ) : (
                novedades.map(item => <NovedadesItem key={item.id}
                    title={item.titulo} subtitule/*Esto es el nombre que pusimos arriba*/={item.subtitlo/*Esto es el nombre de la columna de la base de datos */} 
                    imagen={item.imagen} body={item.cuerpo}
                    />)
            )
        }
        </section>
    );   
};

export default NovedadesPage;