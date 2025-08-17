import { EmptyGoals } from './components/EmptyGoals';
import { NewGoalDialog } from './components/NewGoalDialog';
import { Dialog } from './components/ui/Dialog';

export function App() {
  return (
    <Dialog.Root>
      <EmptyGoals />

      <NewGoalDialog />
    </Dialog.Root>
  );
}
