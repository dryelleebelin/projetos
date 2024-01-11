import Tasks from "./Tasks"
import {fireEvent, render, screen, waitFor} from "@testing-library/react"
import {rest} from "msw"
import {setupServer} from 'msw/node'

describe('Tasks Component', () => {
    const worker = setupServer(
        rest.get("https://jsonplaceholder.typicode.com/todos", async (req, res, ctx) => {
            return res(
                ctx.json([
                    {
                        userId: 1,
                        id: 1,
                        title: "delectus aut autem",
                        completed: false,
                    }
                ])
            )
        })
    )

    beforeAll(() => {
        worker.listen()
    })

    it('should fetch and show tasks on button click', async () => {
        render(<Tasks/>)

        const button = screen.getByText(/get tasks from api/i)

        fireEvent.click(button)

        await waitFor(() => screen.getByText("delectus aut autem"))
    })
})