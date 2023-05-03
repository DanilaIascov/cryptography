// noinspection DuplicatedCode

import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {ALPHABET, Button, Heading, Input, Textarea, Modal, ALPHABET_DIGITS} from '../../../components';
import styles from '../../style.module.css';
import {cleanWord} from "../../../services";
import {getBigrams, playfairEncode} from "../../../services/playfair";


export default function App() {
    const regex = new RegExp('[0-9]');
    const [secretText, setSecretText] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [result, setResult] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        if (secretText) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true);
        }
    }, [secretText]);

    const handleSubmit = () => {
        const cleanSecretText = secretText.toLowerCase().replace(/\s/g, '');
        let encodedText: string;
        if (regex.test(secretText)) {
            const newAlphabet = cleanWord(privateKey + ALPHABET_DIGITS, false);
            const bigrams = getBigrams(cleanSecretText);
            encodedText = playfairEncode(newAlphabet, bigrams, 6)
        } else {
            const newAlphabet = cleanWord(privateKey + ALPHABET);
            const bigrams = getBigrams(cleanSecretText);
            encodedText = playfairEncode(newAlphabet, bigrams)
        }
        setResult(() => {
            setIsModalOpen(true)
            return encodedText
        });
    };

    return (
        <div className='container'>
            <Heading>Playfair encoder</Heading>
            <Textarea
                value={secretText}
                onChange={e => setSecretText(e.target.value)}
                placeholder='Enter...'
                label='Text for encryption:'
            />
            <Input
                value={privateKey}
                onChange={e => setPrivateKey(e.target.value)}
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
