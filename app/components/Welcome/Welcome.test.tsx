import React from 'react'
import { render, screen } from '@testing-library/react'
import { act } from 'react'
import Welcome from './Welcome'

describe('Welcome component', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('renders animated intro elements in sequence', () => {
    render(<Welcome />)
    // Initially, nothing is shown
    expect(screen.queryByRole('img', { name: /photo of jesse/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /hey there!/i })).not.toBeInTheDocument()
    expect(screen.queryByText(/i'm jesse, a senior full stack developer/i)).not.toBeInTheDocument()

    // After 100ms: intro heading
    act(() => {
      jest.advanceTimersByTime(100)
    })
    expect(screen.getByRole('heading', { name: /hey there!/i })).toBeInTheDocument()

    // After 1600ms: image and text
    act(() => {
      jest.advanceTimersByTime(1500)
    })
    expect(screen.getByRole('img', { name: /photo of jesse/i })).toBeInTheDocument()
    expect(screen.getByText(/i'm jesse, a senior full stack developer/i)).toBeInTheDocument()

    // After 2600ms: arrow
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(screen.getByLabelText(/scroll down/i)).toBeInTheDocument()
  })
})
