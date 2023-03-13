import { defineStore } from "pinia";
import { Task } from "src/models/task";



export const usetaskListStore = defineStore("tasks", {
  state: () => ({
    taskList: [] as Task[],
  }),
  actions: {
    addtask(item: Task) {

      if (!item) return;
      this.taskList.push(item);

    },
    deleteTask(id: string) {
        const index = this.findIndexById(id);
  
        if (index === -1) return;
  
        this.taskList.splice(index, 1);
      },
    updateItem(payload: Task) {
        if (!payload || !payload.id) return;
  
        const index = this.findIndexById(payload.id);
  
        if (index !== -1) {
          this.taskList[index] = payload;
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