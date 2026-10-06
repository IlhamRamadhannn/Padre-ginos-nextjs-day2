"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export default class OverviewErrorBoundary extends React.Component<
  Props,
  State
> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  handleRetry = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <section
          role="alert"
          className="rounded-2xl bg-white p-6 shadow-sm"
        >
          <h2 className="text-xl font-bold text-red-800">
            Data gagal dimuat
          </h2>

          <p className="mt-2 text-ink/70">
            Server sedang bermasalah.
          </p>

          <button
            type="button"
            onClick={this.handleRetry}
            className="mt-4 rounded-lg bg-brand px-4 py-2 font-semibold text-white"
          >
            Coba lagi
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}