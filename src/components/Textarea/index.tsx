import { ChangeEvent } from 'react';
import styles from './styles.module.css';
type Props = {
	placeholder?: string;
	label: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};
export default function Textarea({
	label,
	placeholder,
	value,
	onChange,
}: Props) {
	return (
		<label className={styles.label}>
			{label}
			<textarea
				className={styles.textarea}
				placeholder={placeholder ? placeholder : ''}
				value={value}
				onChange={e => onChange(e)}
			></textarea>
		</label>
	);
}
