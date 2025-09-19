import { createFileRoute } from '@tanstack/react-router';

import { Dashboard } from '@/pages/Dashboard';

function Index() {
  return <Dashboard />;
}

export const Route = createFileRoute('/')({
  component: Index,
});
