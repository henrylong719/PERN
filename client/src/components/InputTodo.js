import React from 'react';

const InputTodo = () => {
  const [description, setDescription] = React.useState('');

  const onSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const body = { description };
      const response = await fetch('http://localhost:5001/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      window.location = '/';

      console.log('response', response);
    } catch (error) {}
  };

  return (
    <>
      <h1 className="text-center mt-5">Pern Todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </>
  );
};

export default InputTodo;
