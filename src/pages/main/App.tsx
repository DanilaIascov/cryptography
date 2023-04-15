import {Link} from "react-router-dom";
import {salsa_decoder, salsa_encoder} from "../../index";
import {adfgvx_decoder, adfgvx_encoder, playfair_decoder, playfair_encoder} from "../../index";
import styles from "./style.module.css"

export default function App() {
    return (
        <div className='container'>
            <h1 className={styles.heading}>ADFGX/ADFGVX</h1>
            <Link className={styles.button} to={adfgvx_encoder}>Encoder</Link>
            <Link className={styles.button} to={adfgvx_decoder}>Decoder</Link>
            <h1 className={styles.heading}>Playfair</h1>
            <Link className={styles.button} to={playfair_encoder}>Encoder</Link>
            <Link className={styles.button} to={playfair_decoder}>Encoder</Link>
            <h1 className={styles.heading}>Salsa</h1>
            <Link className={styles.button} to={salsa_encoder}>Encoder</Link>
            <Link className={styles.button} to={salsa_decoder}>Decoder</Link>
        </div>
    )
}