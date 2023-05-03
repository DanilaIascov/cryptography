// noinspection DuplicatedCode

import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Button, Heading, Input, Textarea, Modal} from '../../../components';
import styles from '../../style.module.css'
import {encrypt} from "../../../services/salsa";


export default function App() {
    const [message, setMessage] = useState('');
    const [keyword, setKeyword] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [result, setResult] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        if (message && keyword) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true);
        }
    }, [message, keyword]);

    const handleSubmit = () => {
        const nonce = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
        let ciphertext = encrypt(message, nonce, keyword)
        setResult(() => {
            setIsModalOpen(true)
            return ciphertext as string
        });
    };

    return (
        <div className='container'>
            <Heading>Salsa20 Encoder</Heading>
            <Textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
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
