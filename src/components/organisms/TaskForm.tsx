import Button from '../atoms/Button';
import Input from '../atoms/Input';
import FormField from '../molecules/FormField';
import { Task } from '../molecules/TaskCard';

export interface TaskFormValues {
  title: string;
  description: string;
  priority: Task['priority'];
  status: Task['status'];
  dueDate: string;
}

interface TaskFormProps {
  values: TaskFormValues;
  isEditing: boolean;
  onChange: (values: TaskFormValues) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function TaskForm({
  values,
  isEditing,
  onChange,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4 shadow-xl">
        <h2 className="text-lg font-semibold text-gray-900">
          {isEditing ? 'Edit Task' : 'New Task'}
        </h2>

        <form onSubmit={onSubmit} className="space-y-3">
          <FormField id="title" label="Title">
            <Input
              id="title"
              type="text"
              required
              value={values.title}
              onChange={(e) => onChange({ ...values, title: e.target.value })}
            />
          </FormField>

          <FormField id="description" label="Description">
            <textarea
              id="description"
              value={values.description}
              onChange={(e) => onChange({ ...values, description: e.target.value })}
              className="w-full border rounded-md px-3 py-2 text-sm"
              rows={3}
            />
          </FormField>

          <div className="grid grid-cols-2 gap-3">
            <FormField id="priority" label="Priority">
              <select
                id="priority"
                value={values.priority}
                onChange={(e) =>
                  onChange({ ...values, priority: e.target.value as Task['priority'] })
                }
                className="w-full border rounded-md px-3 py-2 text-sm"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </FormField>

            <FormField id="status" label="Status">
              <select
                id="status"
                value={values.status}
                onChange={(e) =>
                  onChange({ ...values, status: e.target.value as Task['status'] })
                }
                className="w-full border rounded-md px-3 py-2 text-sm"
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
            </FormField>
          </div>

          <FormField id="dueDate" label="Due Date">
            <Input
              id="dueDate"
              type="date"
              value={values.dueDate}
              onChange={(e) => onChange({ ...values, dueDate: e.target.value })}
            />
          </FormField>

          <div className="flex gap-2 pt-2">
            <Button type="submit" className="flex-1">
              {isEditing ? 'Save Changes' : 'Create Task'}
            </Button>
            <Button type="button" variant="secondary" className="flex-1" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}