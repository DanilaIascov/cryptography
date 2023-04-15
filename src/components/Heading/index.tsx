import styles from './styles.module.css'

type Props = {
    children: string
}

export default function Heading({children}: Props) {
    return (
        <h1 className={styles.heading}>{children}</h1>
    )
}