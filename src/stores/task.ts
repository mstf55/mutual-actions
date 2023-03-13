import { defineStore } from "pinia";
import { Task } from "src/models/task";



export const usetaskListStore = defineStore("tasks", {
  state: () => ({
    taskList: [] as Task[],
  }),
  actions: {
    addtask(task: Task) {

      if (!task) return;
      this.taskList.push(task);

    },
    deleteTask(id: string) {
        const index = this.findIndexById(id);
  
        if (index === -1) return;
  
        this.taskList.splice(index, 1);
      },
    updateTask(task: Task) {
        if (!task || !task.id) return;
  
        const index = this.findIndexById(task.id);
  
        if (index !== -1) {
          this.taskList[index] = task;
        }
      },
    changeTaskStatus(id: string) {
      const task = this.taskList.find((obj) => obj.id === id);
      if (task) {
        task.state = !task.state;
      }
    },
    findIndexById(id: string) {
        return this.taskList.findIndex((task) => task.id === id);
      },
  },
});

export default usetaskListStore;