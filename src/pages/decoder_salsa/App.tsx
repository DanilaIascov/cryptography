import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Button, Heading, Input, Modal, Textarea} from '../../components';
import styles from './style.module.css';
import {decrypt} from "../../services/salsa";

export default function App() {
    const [secretText, setSecretText] = useState('');
    const [keyword, setKeyword] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [result, setResult] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        if (secretText && keyword) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true);
        }
    }, [secretText, keyword]);

    const handleSubmit = () => {
        const nonce = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
        let plaintext = decrypt(secretText, nonce, keyword);
        setResult(() => {
            setIsModalOpen(true)
            return plaintext as string
        });
    };
    return (
        <div className='container'>
            <Heading>Salsa20 Decoder</Heading>
            <Textarea
                value={secretText}
                onChange={e => setSecretText(e.target.value)}
                placeholder='Enter...'
                label='Text for encryption:'
            />
            <Input
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                label='Private keyword:'
                placeholder='Enter keyword...'
            />
            <Modal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
                <Heading>Your encoded text</Heading>
                {result}
            </Modal>
            <Button disabled={isDisabled} onClick={() => handleSubmit()}>
                Code
            </Button>
            <Link className={styles.button} to='/'>
                Back
            </Link>
        </div>
    );
}
