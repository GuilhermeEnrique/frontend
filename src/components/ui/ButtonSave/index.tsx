import { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss';

import { FaSpinner } from 'react-icons/fa';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean,
    children: ReactNode,
}

export function ButtonSave({ loading, children, ...rest }: ButtonProps) {
    return (
        <button
            className={styles.button}
            disabled={loading}
            {...rest}
        >
            {loading ? (
                <FaSpinner color='#FFF' size={16} />
            ) : (
                <>
                    <span className={styles.buttonText}>
                        {children}
                    </span>
                </>
            )}
        </button>
    )
}