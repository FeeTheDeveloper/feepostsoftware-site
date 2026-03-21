"use client";

import type { ReactNode } from "react";
import { Component } from "react";

type ClientErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type ClientErrorBoundaryState = {
  hasError: boolean;
};

export class ClientErrorBoundary extends Component<
  ClientErrorBoundaryProps,
  ClientErrorBoundaryState
> {
  state: ClientErrorBoundaryState = {
    hasError: false
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // Fail silently for non-critical enhancement components.
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }

    return this.props.children;
  }
}
