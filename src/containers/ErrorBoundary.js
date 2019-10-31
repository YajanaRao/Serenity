import React from 'react';
import { Surface, Title, Paragraph, Divider } from 'react-native-paper';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    const { error, errorInfo } = this.state;
    const { children } = this.props;
    if (errorInfo) {
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
