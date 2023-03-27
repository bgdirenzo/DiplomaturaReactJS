import React from "react";
import '../styles/components/pages/contactoPage.css';

const ContactoPage = (props) => {
    return (
        <main>
            <div className="holder contacto">
                <h2>Contacto Rapido</h2>
                <form action="" method="" className="formulario">
                    <p>
                        <label for="nombre">Nombre</label>
                        <input type="text" name="" />
                    </p>
                    <p>
                        <label for="email">Email</label>
                        <input type="text" name="" />
                    </p>
                    <p>
                        <label for="telefono">Telefono</label>
                        <input type="text" name="" />
                    </p>
                    <p>
                        <label for="mensaje">Mensaje</label>
                        <textarea name=""></textarea>
                    </p>
                    <p class="acciones">
                        <input type="submit" value="Enviar" />
                    </p>
                </form>
            </div>
            <div>
                <h2>Otras vias de comunicacion</h2>
                <p>Tambien puede conactarse con nosotros usando los siguientes medios</p>
                <ul>
                    <li>Telefono</li>
                    <li>Email</li>
                    <li>Facebook</li>
                    <li>Twitter</li>
                    <li>Skype</li>
                </ul>
            </div>
        </main>
    );
}

export default ContactoPage;