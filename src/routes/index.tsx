import { createFileRoute } from '@tanstack/react-router';

import { DashboardSearchSchema } from '@/app/schemas/DashboardSearchSchema';

import { Dashboard } from '@/pages/Dashboard';

function Index() {
  return <Dashboard />;
}

export const Route = createFileRoute('/')({
  component: Index,
  validateSearch: DashboardSearchSchema,
});
