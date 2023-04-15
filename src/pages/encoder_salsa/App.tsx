// noinspection DuplicatedCode

import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Button, Heading, Input, Textarea, Modal} from '../../components';
import styles from './style.module.css';
import {encrypt, salsa20Expansion} from "../../services/salsa";


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
        let test = salsa20Expansion([
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
            201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216,
        ],
            [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116]
        )
        console.log('тест', test)
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
