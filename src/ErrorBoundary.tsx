import React from 'react';

interface IState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<{}, IState> {

  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(_: any) {
    return { hasError: true };
  }

  public componentDidCatch(_: any, __: any) {
    //
  }

  public render() {
    return this.props.children;
  }
}
