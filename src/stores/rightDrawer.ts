import { markRaw } from "vue";
import { defineStore } from "pinia";
import { Task } from "src/models/task";

export type RightDrawer = {
  isOpen: boolean,
  view: object,
  payload:Task
};

export const useRightDrawer = defineStore("RightDrawer", {
  state: (): RightDrawer => ({
    isOpen: false,
    view: {},
    payload:{
      endDate : new Date(),
      id:"",
      state:false,
      tags:[],
      title:"",
      description:""
    }
  }),
  actions: {
    open(view: object, payload:Task) {
      this.isOpen = true;
      this.view = markRaw(view);
      this.payload = payload;
    },
    close() {
      this.isOpen = false;
      this.view = {};
    },
  },
});

export default useRightDrawer;