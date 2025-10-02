import { createFileRoute, redirect } from '@tanstack/react-router';

import { queryClient } from '@/app/core/providers/queryClient';

import { makeUserService } from '@/app/factories/makeUserService';

import { DashboardSearchSchema } from '@/app/schemas/DashboardSearchSchema';
import { Dashboard } from '@/pages/Dashboard';

function Index() {
  return <Dashboard />;
}

export const Route = createFileRoute('/')({
  component: () => <Index />,
  validateSearch: DashboardSearchSchema,
  beforeLoad: async () => {
    const usersService = makeUserService();

    try {
      await queryClient.ensureQueryData({
        queryKey: ['activeUser'],
        queryFn: () => usersService.me(),
      });
    } catch {
      throw redirect({ to: '/login', replace: true });
    }
  },
});
