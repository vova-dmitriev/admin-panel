import React, { Component, ErrorInfo } from 'react';
import { NotFoundPage } from '@/pages';
import styles from './ErrorBoundary.module.scss';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className={styles.wrapper}>
          <div className={styles.body}>
            <NotFoundPage text="Произошла ошибка" />
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
