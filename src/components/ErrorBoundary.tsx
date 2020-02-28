import React from 'react';
import { Container, Title } from 'simple-component-kit';

interface State {
  hasError: boolean;
}

interface Props {}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <Title>Something went wrong</Title>;
    }

    return <Container>{this.props.children} </Container>;
  }
}

export default ErrorBoundary;
