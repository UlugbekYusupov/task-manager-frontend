import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Project {
  id: string;
  name: string;
  description: string;
}

interface Tasks {
  id: string;
  name: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  assignedTo: string;
}

interface ProjectState {
  ownedProjects: Project[];
  participatedProjects: Project[];
  tasks: Tasks[];
}

const initialState: ProjectState = {
  ownedProjects: [],
  participatedProjects: [],
  tasks: [],
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (
      state,
      action: PayloadAction<{
        ownedProjects: Project[];
        participatedProjects: Project[];
        tasks: Tasks[];
      }>
    ) => {
      state.ownedProjects = action.payload.ownedProjects;
      state.participatedProjects = action.payload.participatedProjects;
      state.tasks = action.payload.tasks;
    },
    clearProjects: (state) => {
      state.ownedProjects = [];
      state.participatedProjects = [];
    },
  },
});

export const { setProjects, clearProjects } = projectSlice.actions;
export default projectSlice.reducer;
