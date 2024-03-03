import styles from './styles.module.scss'
import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'  //tipagem do input

//sobre-escrevendo
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}

export function Input({...rest}: InputProps){  //quando utilizar precisa-rá passar as propriedades
    return(
        <input className={styles.input} {...rest}/>
    )
}

export function TextArea({...rest}: TextAreaProps){
    return(
        <textarea className={styles.input}>
        
        </textarea>
    )
}