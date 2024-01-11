import { ReactNode } from "react";

const Button = ({disabled, children, onClick}: {disabled: boolean, children: ReactNode, onClick: () => void}) => {  //recebe como prop um desabled
    return(
        <button style={{backgroundColor: disabled ? 'red' : 'blue', color: "white", padding: 10, borderRadius: 8, border: "none", cursor: "pointer"}} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;