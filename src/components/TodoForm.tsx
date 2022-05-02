interface TodoFormProps {
  name: string;
  handleFormReset: () => void;
  handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id?: number | null;
}

function TodoForm({
  name,
  handleFormSubmit,
  handleFormReset,
  handleNameChange,
  id = null,
}: TodoFormProps) {
  return (
    <form
      className="mt-3 flex-row"
      onSubmit={handleFormSubmit}
      onReset={handleFormReset}
    >
      <label className="block my-2" htmlFor="name">
        Task:{' '}
      </label>
      <input
        className="block my-2 border-2 text-black"
        id="name"
        value={name}
        placeholder="Enter task name"
        onChange={handleNameChange}
      />
      <div className="flex justify-end">
        <button
          className="my-2 mx-1 py-2 px-5 border-2 rounded-xl hover:bg-white hover:text-blue-500"
          type="submit"
        >
          {id ? 'Edit' : 'Add'}
        </button>
        <button
          className="my-2 mx-1 py-2 px-5 border-2 rounded-xl bg-red-500 hover:bg-red-400 hover:text-white"
          type="reset"
        >
          {id ? 'Cancel' : 'Clear'}
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
