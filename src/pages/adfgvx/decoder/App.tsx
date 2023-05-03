import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {ALPHABET, Button, Heading, Input, Modal, Textarea} from '../../../components';
import styles from '../../style.module.css';
import {
    firstDecode,
    secondDecode,
    addDigits
} from '../../../services/adfgvx';
import {cleanWord, createPolybiosSquare} from "../../../services";

export default function App() {
    const regex = new RegExp('V');
    const [secretText, setSecretText] = useState('');
    const [firstKeyword, setFirstKeyword] = useState('');
    const [secondKeyword, setSecondKeyword] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [result, setResult] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [algorithm, setAlgorithm] = useState('ADFGX decoder')

    useEffect(() => {
        if (regex.test(secretText)) {
            setAlgorithm('ADFGVX decoder')
        } else {
            setAlgorithm('ADFGX decoder')
        }
        if (secretText && firstKeyword) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true);
        }
    }, [secretText, firstKeyword]);

    const handleSubmit = () => {
        const cleanKeyword = firstKeyword.toLowerCase();
        const firstDecodedText = firstDecode(cleanKeyword, secretText.replace(/\s/g, ''));
        let secondDecodedText:string;
        if (regex.test(secretText)) {
            const newAlphabet = addDigits(cleanWord(secondKeyword + ALPHABET, false));
            const polybios = createPolybiosSquare(newAlphabet, 6);
            secondDecodedText = secondDecode(polybios, firstDecodedText, true);
        } else {
            const newAlphabet = cleanWord(secondKeyword + ALPHABET);
            const polybios = createPolybiosSquare(newAlphabet);
            secondDecodedText = secondDecode(polybios, firstDecodedText);
        }
        setResult(() => {
            setIsModalOpen(true)
            return secondDecodedText
        });
    };
    return (
        <div className='container'>
            <Heading>{algorithm}</Heading>
            <Textarea
                value={secretText}
                onChange={e => setSecretText(e.target.value)}
                placeholder='Enter...'
                label='Text for encryption:'
            />
            <Input
                value={firstKeyword}
                onChange={e => setFirstKeyword(e.target.value)}
                label='Private keyword:'
                placeholder='Enter keyword...'
            />
            <Input
                value={secondKeyword}
                onChange={e => setSecondKeyword(e.target.value)}
                label='Keyword for the mixed alphabet:'
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
