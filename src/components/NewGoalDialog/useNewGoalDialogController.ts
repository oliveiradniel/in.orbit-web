import { useId } from 'react';

export function useNewGoalDialogController() {
  const inputTitleId = useId();

  return {
    inputTitleId,
  };
}
