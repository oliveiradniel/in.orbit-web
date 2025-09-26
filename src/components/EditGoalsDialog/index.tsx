import { DialogTemplate } from '../TemplateDialog';

interface EditGoalsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditGoalsDialog({ isOpen, onClose }: EditGoalsDialogProps) {
  return (
    <DialogTemplate
      title="Edite suas metas"
      description="Edite o título ou exclua algumas de suas metas"
      isOpen={isOpen}
      onClose={onClose}
    >
      ...
    </DialogTemplate>
  );
}
