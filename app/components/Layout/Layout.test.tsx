import React from 'react'
import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react'
import Layout from './Layout'

describe('Layout component', () => {
  it('renders children and hamburger menu', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
    // Hamburger menu button (Menu icon)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('opens and closes the modal menu', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    )
    // Open menu
    fireEvent.click(screen.getByRole('button'))
    // Modal links
    expect(screen.getByRole('link', { name: /about me/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /ai assistant/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /lets connect/i })).toBeInTheDocument()
    // Close button (X icon)
    const closeButton = screen.getByRole('button', { name: /close menu/i })
    fireEvent.click(closeButton)
    // Modal should close (links disappear)
    return waitForElementToBeRemoved(() => screen.queryByRole('link', { name: /about me/i }))
  })
})
