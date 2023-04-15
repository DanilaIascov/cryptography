import styles from './styles.module.css';
type Props = {
	children: string;
	onClick: () => void;
	disabled: boolean;
};
export default function Button({ children, onClick, disabled }: Props) {
	return (
		<button
			disabled={disabled}
			onClick={() => onClick()}
			className={styles.button}
		>
			{children}
		</button>
	);
}
