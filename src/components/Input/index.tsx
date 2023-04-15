import { ChangeEvent } from 'react';
import styles from './styles.module.css';
type Props = {
	placeholder?: string;
	label: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
export default function Input({ label, placeholder, value, onChange }: Props) {
	return (
		<label className={styles.label}>
			{label}
			<input
				className={styles.input}
				placeholder={placeholder ? placeholder : ''}
				value={value}
				onChange={(e) => onChange(e)}
				type='text'
			></input>
		</label>
	);
}
