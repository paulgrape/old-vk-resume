import { Component, type ErrorInfo, type ReactNode } from 'react'
import { useLocale } from '@/i18n/LocaleContext'

type FallbackCopy = {
  title: string
  body: string
  retryLabel: string
}

type ErrorBoundaryInnerProps = FallbackCopy & {
  children: ReactNode
}

type ErrorBoundaryInnerState = {
  hasError: boolean
}

class ErrorBoundaryInner extends Component<
  ErrorBoundaryInnerProps,
  ErrorBoundaryInnerState
> {
  state: ErrorBoundaryInnerState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryInnerState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack)
  }

  handleRetry = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='mx-auto max-w-[791px] px-4 py-8 text-left'>
          <p className='m-0 text-[15px] font-bold text-vk-heading'>
            {this.props.title}
          </p>
          <p className='mt-2 mb-0 text-[13px] text-vk-text'>
            {this.props.body}
          </p>
          <button
            type='button'
            className='mt-4 border-0 bg-transparent p-0 text-[13px] text-vk-link hover:underline cursor-pointer'
            onClick={this.handleRetry}
          >
            {this.props.retryLabel}
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export function ErrorBoundary({ children }: { children: ReactNode }) {
  const { messages } = useLocale()

  return (
    <ErrorBoundaryInner
      title={messages.ui.errorTitle}
      body={messages.ui.errorBody}
      retryLabel={messages.ui.errorRetry}
    >
      {children}
    </ErrorBoundaryInner>
  )
}
