import { RouterProvider, createRouter } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { QueryProvider } from './app/core/providers/QueryProvider';

import { routeTree } from './routeTree.gen';

export const router = createRouter({ routeTree });

export function App() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
      <TanStackRouterDevtools router={router} />
    </QueryProvider>
  );
}
