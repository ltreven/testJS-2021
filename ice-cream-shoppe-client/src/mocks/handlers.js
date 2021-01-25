import { rest } from 'msw'

export const handlers = [
    rest.get('http://localhost:3030/flavors', (req, res, ctx) => {
        console.log("inside handlers")
        return res(
            // mimics the response from the server
            ctx.json([{
                "name": "Vanilla",
                "imagePath": "/images/vanilla.png"
            },
            {
                "name": "Chocolate",
                "imagePath": "/images/chocolate.png"
            }]
            )
        )
    })
]