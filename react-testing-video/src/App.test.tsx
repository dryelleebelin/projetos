import { render, screen, fireEvent, getByText } from '@testing-library/react'
import App from './App'

const sum = (x: number, y:number) => {  //typescript
    return x + y
}

describe('App Component', () => {  //bloco para colocar os testes
    it('should sum correctly', () => {  //este teste deve somar corretamente
        expect(sum(4,4)).toBe(8)  //espera-se que... seja... //jest matchers
    })  

    it('should render App with hello message', () => {  //neste teste o app deve ser renderizado
        render(<App/>)  //renderiza o componente
        screen.getByText("Hello world!")  //pegar o elemento dentro do componente
    })  

    it('should change message on button click', () => { //verificar se a mensagem é alterada quando clicar no botão
        render(<App/>)

        screen.getByText("Let's learn more about testing in React")  //verifica se a mensagem inicial foi exibida

        fireEvent.click(screen.getByText('Change message'))  //executa certos eventos, recebe o elemento como primeiro parâmetro  //vai fazer um click no elemento

        screen.getByText('New message!')

        const oldMessage = screen.queryByText("Let's learn more about testing in React")  //a query quando ela não acha o que a gente passa pra ela, ela não falha o teste, já o get falha e dá erro

        expect(oldMessage).not.toBeInTheDocument()  //espera-se que esteja no documento  //.not = inverte a expectiva
    })
})

export default {};