/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import React from 'react'

class ErrorBoundary extends React.Component<
  { onError: (eMessage: string) => any },
  { hasError: boolean }
> {
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error(error)
    console.error(errorInfo)
    this.props.onError(error.message)
  }

  render() {
    return this.props.children
  }
}
export default ErrorBoundary
