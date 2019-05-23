let tasks = JSON.parse(localStorage.getItem('tasks'));
if (!tasks) {
  localStorage.setItem('tasks', JSON.stringify([
    {
      id: 1, title: 'Breakfast', description: 'Lets make delicious eggs'
    },
    {
      id: 2, title: 'Walking', description: ''
    },
  ]));
}


let counter = 2;

export const axios = {
  get: () => new Promise(resolve => resolve(tasks)),
  post: ({ title, description }) => new Promise(resolve => {
    counter++;
    tasks.push({ id: counter, title, description });
    resolve(localStorage.setItem('tasks', JSON.stringify(tasks)));
  }),
  put: (id, { title, description }) => new Promise(resolve => {
    const task = tasks.find((t) => t.id === id);
    task.title = title;
    task.description = description;
    resolve(localStorage.setItem('tasks', JSON.stringify(tasks)));
  }),
  delete: (id) => new Promise(resolve => {
    tasks = tasks.filter((t) => t.id !== id);
    resolve(localStorage.setItem('tasks', JSON.stringify(tasks)));
  })
};
