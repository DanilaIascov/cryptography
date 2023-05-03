import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Heading, Input, Modal, Textarea } from '../../../components';
import styles from '../../style.module.css';
import {
	bitArrayToHexString,
	desDecrypt,
	desEncrypt,
	hexStringToBitArray,
} from '../../../services/des';

export default function App() {
	const [secretText, setSecretText] = useState('');
	const [keyword, setKeyword] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);
	const [result, setResult]: any = useState();
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		if (secretText && keyword) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	}, [secretText, keyword]);

	const handleSubmit = () => {
		const bitPlaintext = hexStringToBitArray(secretText);
		const bitKeyWord = hexStringToBitArray(keyword);
		const decryptedText = desDecrypt(bitPlaintext, bitKeyWord);
		setResult(() => {
			setIsModalOpen(true);
			return (
				<div className='container'>
					<Heading>Your decoded text</Heading>
					{bitArrayToHexString(decryptedText)}
				</div>
			);
		});
	};

	function handleFirstTest() {
		setSecretText('C0B7A8D05F3A829C');
		setKeyword('aabb09182736ccdd');
		setIsModalOpen(false);
	}
	function handleSecondTest() {
		setSecretText('4789FD476E82A5F1');
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
			<Heading>DES Decoder</Heading>
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
				{result}
			</Modal>
			<Button disabled={false} onClick={() => handleGetTest()}>
				Give test data
			</Button>
			<Button disabled={isDisabled} onClick={() => handleSubmit()}>
				Code
			</Button>
			<Link className={styles.button} to='/'>
				Back
			</Link>
		</div>
	);
}
