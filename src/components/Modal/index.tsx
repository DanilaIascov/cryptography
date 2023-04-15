import styles from './styles.module.css';
import {HtmlHTMLAttributes, PropsWithChildren} from "react";

type Props = HtmlHTMLAttributes<PropsWithChildren> & {
    setIsModalOpen: (b: boolean) => void;
    isOpen: boolean
};
export default function Modal({children, setIsModalOpen, isOpen}: Props) {


    return (
        <div className={`${styles.modal} ${isOpen ? styles.isOpen : '' }`} onClick={() => {
            setIsModalOpen(false)
        }}>
            <div className={styles.content} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}
