import { findByRole, render, screen } from "@testing-library/react";
import App from "./App";
import { server } from './mocks/server'
import { rest } from 'msw'


// important to add todo otherwise jest will fail with empty tests
//test.todo("some tests here");

test("displays images from the server", async () => {
  render(<App />)

  // show loading spinner
  const loadingSpinner = await screen.findByRole('progressbar')
  expect(loadingSpinner).toBeVisible()

  // load images from server
  const images = await screen.findAllByRole('img', { name: /flavor$/i })
  //screen.debug()
  expect(images).toHaveLength(2)

  // loading spinner no longer shows
  const hiddenLoadingSpinner = screen.getByRole('progressbar', { hidden: true })
  expect(hiddenLoadingSpinner).not.toBeVisible()

  // no error is visible
  const error = screen.queryByRole('alert')
  expect(error).not.toBeInTheDocument()

})

test('displays error upon error response from server', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/flavors', (req, res, ctx) => res(ctx.status(500)))
  )

  render(<App />)

  // show loading spinner
  const loadingSpinner = await screen.findByRole('progressbar')
  expect(loadingSpinner).toBeVisible()

  // expect the error
  const error = await screen.findByRole('alert')
  expect(error).toBeVisible()
  // name option doesn't work for this particualar DOM
  expect(error).toHaveTextContent('error contacting the server')

  // loading spinner no longer shows
  const hiddenLoadingSpinner = screen.getByRole('progressbar', { hidden: true })
  expect(hiddenLoadingSpinner).not.toBeVisible()


})