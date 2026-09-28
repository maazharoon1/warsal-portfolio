import { ProjectObject } from "./projectVariable"

export const sortProject = (id: string ) => {
  const project = ProjectObject.find((project) => project.id === id)
  return project 
}

