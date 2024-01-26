'use client'

import { Component } from "react";
import Link from "next/link";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught error - ", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2>
          There was an error with this listing.{" "}
          <Link href="/">Click here to go back to the home page.</Link>
        </h2>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
