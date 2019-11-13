import React from 'react';
import { Surface, Title, Paragraph, Divider } from 'react-native-paper';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null, hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { error: error, hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
      hasError: true,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    const { error, errorInfo, hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      // Error path
      return (
        <Surface>
          <Title>Something went wrong.</Title>
          <Paragraph style={{ whiteSpace: 'pre-wrap' }}>
            {error && error.toString()}
          </Paragraph>
          <Divider />
          <Paragraph>{errorInfo.componentStack}</Paragraph>
        </Surface>
      );
    }
    // Normally, just render children
    return children;
  }
}

export default ErrorBoundary;
