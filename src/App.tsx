import { QueryProvider } from './app/core/providers/QueryProvider';

import { Dashboard } from './pages/Dashboard';

export function App() {
  return (
    <QueryProvider>
      <Dashboard />
    </QueryProvider>
  );
}
