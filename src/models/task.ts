export interface Task {
    id: string;
    title: string;
    tags: string[];
    endDate: Date;
    state: boolean;
    description?:string;
  }