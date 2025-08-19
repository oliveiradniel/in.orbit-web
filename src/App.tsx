// import { EmptyGoals } from './components/EmptyGoals';
import { QueryProvider } from './app/core/providers/QueryProvider';

import { NewGoalDialog } from './components/NewGoalDialog';
import { Summary } from './components/Summary';
import { Dialog } from './components/ui/Dialog';

export function App() {
  return (
    <QueryProvider>
      <Dialog.Root>
        {/* <EmptyGoals /> */}

        <NewGoalDialog />

        <Summary />
      </Dialog.Root>
    </QueryProvider>
  );
}
