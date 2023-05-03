// noinspection DuplicatedCode

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Heading, Input, Textarea, Modal } from '../../../components';
import styles from '../../style.module.css';
import {
	bitArrayToHexString,
	desEncrypt,
	hexStringToBitArray,
} from '../../../services/des';

export default function App() {
	const [message, setMessage] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);
	const [keyword, setKeyword] = useState('');
	const [result, setResult]: any = useState();
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		if (message && keyword) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	}, [message, keyword]);

	const handleSubmit = () => {
		const bitPlaintext = hexStringToBitArray(message);
		const bitKeyWord = hexStringToBitArray(keyword);
		const encryptedText = desEncrypt(bitPlaintext, bitKeyWord);
		setResult(() => {
			setIsModalOpen(true);
			return (
				<div className='container'>
					<Heading>Your encoded text</Heading>
					{bitArrayToHexString(encryptedText)}
				</div>
			);
		});
	};

	function handleFirstTest() {
		setMessage('123456abcd132536');
		setKeyword('aabb09182736ccdd');
		setIsModalOpen(false);
	}
	function handleSecondTest() {
		setMessage('0000000000000000');
		setKeyword('22234512987ABB23');
		setIsModalOpen(false);
	}

	function handleGetTest() {
		setResult(() => {
			setIsModalOpen(true);
			return (
				<div className='container'>
					<Heading>Select test data</Heading>
					<Button disabled={false} onClick={() => handleFirstTest()}>
						Give first test data
					</Button>
					<Button disabled={false} onClick={() => handleSecondTest()}>
						Give second test data
					</Button>
				</div>
			);
		});
	}

	return (
		<div className='container'>
			<Heading>DES Encoder</Heading>
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
