import {Link} from "react-router-dom";
import {
    adfgvx_decoder,
    adfgvx_encoder,
    salsa_decoder,
    salsa_encoder,
    playfair_decoder,
    playfair_encoder,
    des_encoder,
    des_decoder,
    sha256_hash
} from "../../index";
import styles from "../style.module.css"

export default function App() {
    return (
        <div className='wrapper'>
            <div className='container'>
                <h1 className={styles.heading}>ADFGX/ADFGVX</h1>
                <Link className={styles.button} to={adfgvx_encoder}>Encoder</Link>
                <Link className={styles.button} to={adfgvx_decoder}>Decoder</Link>
            </div>
            <div className='container'>
                <h1 className={styles.heading}>Playfair</h1>
                <Link className={styles.button} to={playfair_encoder}>Encoder</Link>
                <Link className={styles.button} to={playfair_decoder}>Encoder</Link>
            </div>
            <div className='container'>
                <h1 className={styles.heading}>Salsa20</h1>
                <Link className={styles.button} to={salsa_encoder}>Encoder</Link>
                <Link className={styles.button} to={salsa_decoder}>Decoder</Link>
            </div>
            <div className='container'>
                <h1 className={styles.heading}>DES</h1>
                <Link className={styles.button} to={des_encoder}>Encoder</Link>
                <Link className={styles.button} to={des_decoder}>Decoder</Link>
            </div>
            <div className='container'>
                <h1 className={styles.heading}>SHA 256</h1>
                <Link className={styles.button} to={sha256_hash}>Hash</Link>
            </div>
        </div>
    )
}