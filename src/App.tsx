import { NewGoalDialog } from './components/NewGoalDialog';
import { Summary } from './components/Summary';
import { Dialog } from './components/ui/Dialog';

export function App() {
  return (
    <Dialog.Root>
      {/* <EmptyGoals /> */}

      <NewGoalDialog />

      <Summary />
    </Dialog.Root>
  );
}
