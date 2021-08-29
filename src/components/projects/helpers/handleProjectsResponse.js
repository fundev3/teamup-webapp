import { getProjectBySkill } from "../ProjectsAPI";

let projectsId = {};
let projectsFound = [];
let skillsFound = [];

function resetInitialValues() {
  projectsId = {};
  projectsFound = [];
  skillsFound = [];
}

export async function getProjectsBySkillName(skills) {
  resetInitialValues();
  for (const skill of skills) {
    const skillName = skill.name;
    const projects = await getProjectBySkill(skillName);
    separateProjectsIfExist(projects || [], skillName);
  }
  countSkillsByProject();
  sortProjectsByNumberSkills(projectsFound);
  console.log("projectsFound", projectsFound);
  return projectsFound;
}

function separateProjectsIfExist(projects, skillName) {
  if (projects.length > 0) {
    skillsFound.push(skillName);
    projects.forEach((project) => {
      if (!projectsId[project.id]) {
        projectsId[project.id] = 1;
        project.skillCounter = 0;
        projectsFound.push(project);
      }
    });
  }
}

function countSkillsByProject() {
  skillsFound.forEach((skillName) => {
    projectsFound.forEach((project) => {
      if (checkHasSkill(project.skills, skillName)) {
        project.skillCounter++;
      }
    });
  });
}

function checkHasSkill(skills, skillName) {
  for (let i = 0; i < skills.length; i++) {
    const skill = skills[i];
    if (skill.name === skillName) return true;
  }
  return false;
}

function sortProjectsByNumberSkills(projects) {
  projects.sort((a, b) => b.skillCounter - a.skillCounter);
}
