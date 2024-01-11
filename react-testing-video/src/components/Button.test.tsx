import { fireEvent, render, screen } from "@testing-library/react"
import Button from "./Button"

describe('Button Component', () => {
    it('should render with red background if desabled' , () => {
        render(<Button disabled={false} onClick={() => {}}>Click me</Button>)

        const button = screen.getByRole('button', {name: 'Click me'})  //screen - captura, pega  //outra forma de selecionar elementos

        expect(button).toHaveStyle({ backgroundColor: "blue" })  //espera-se que o botão...  //matcher do testing library
    })

    it('should call onClick prop on click', () => {
        const onClick = jest.fn()  //colocar quando quer verificar se uma função foi chamada  //retorna uma função monitorada pelo jest

        render(<Button disabled onClick={onClick}>Click me</Button>)

        const button = screen.getByText('Click me')

        fireEvent.click(button)

        expect(onClick).toHaveBeenCalled()  //espero que o onclick tenha sido chamado
    })
})