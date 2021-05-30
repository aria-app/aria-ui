import { render, RenderOptions, RenderResult } from '@testing-library/react';
import React from 'react';

import { lightTheme, ThemeProvider } from '.';

function customRender(
  ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  options?: RenderOptions,
): RenderResult {
  return render(ui, {
    wrapper: ({ children }) => {
      return <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>;
    },
    ...(options || {}),
  });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
