// noinspection DuplicatedCode

import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Button, Heading, Textarea, Modal} from '../../../components';
import styles from '../../style.module.css'
import {sha256} from "../../../services/sha256";


export default function App() {
    const [message, setMessage] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [result, setResult]: any = useState();
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        if (message) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true);
        }
    }, [message]);

    const handleSubmit = () => {
        const res = sha256(message)
        setResult(() => {
            setIsModalOpen(true)
            return <div className='container'>
                <Heading>Your hash</Heading>
                {res}
            </div>
        })
    };


    function handleGetTest() {
        setResult(() => {
            setIsModalOpen(true)
            return (
                <div className='container'>
                    <Heading>Select test data</Heading>
                    <Button disabled={false} onClick={() => setMessage(() => {
                        setIsModalOpen(false)
                        return 'The quick brown fox jumps over the lazy dog'
                    })}>
                        The quick brown fox jumps over the lazy dog
                    </Button>
                    <Button disabled={false} onClick={() => setMessage(() => {
                        setIsModalOpen(false)
                        return 'The quick brown fox jumps over the lazy cog'
                    })}>
                        The quick brown fox jumps over the lazy cog
                    </Button>
                    <Button disabled={false} onClick={() => setMessage(() => {
                        setIsModalOpen(false)
                        return 'abc'
                    })}>
                        abc
                    </Button>
                </div>
            )
        })
    }

    return (
        <div className='container'>
            <Heading>SHA-256 Hash</Heading>
            <Textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder='Enter...'
                label='Text for encryption:'
            />
            <Modal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
                {result}
            </Modal>
            <Button disabled={false} onClick={() => handleGetTest()}>
                Give test data
            </Button>
            <Button disabled={isDisabled} onClick={() => handleSubmit()}>
                Encode
            </Button>
            <Link className={styles.button} to='/'>
                Back
            </Link>
        </div>
    );
}
