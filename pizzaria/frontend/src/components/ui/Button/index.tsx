import styles from './styles.module.scss'
import { ReactNode, ButtonHTMLAttributes } from 'react'
import {FaSpinner} from 'react-icons/fa'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean
    children: ReactNode
}

export function Button({loading, children, ...rest}: ButtonProps){
    return(
        <button className={styles.button} disabled={loading} {...rest}>
            {/* renderização condicional */}
            { loading ? (
                <FaSpinner color="#fff" size={16}/>
            ) : (
                <a className={styles.buttonText}>{children}</a>
            )}
        </button>
    )
}