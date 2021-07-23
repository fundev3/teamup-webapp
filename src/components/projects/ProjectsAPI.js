import axios from "axios";
export default async function getProjects() {
  let handlerError = false;
  try {
    const { data: result } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return result;
  } catch (error) {
    if (error.response) {
      alert(error);
    } else if (error.request) {
      alert(error);
    } else {
      alert("Error: Something is wrong");
    }
    handlerError = true;
    return handlerError;
  }
}

export async function getProject(id) {
  let handlerError = false;
  try {
    const result = {
      Project: {
        contact: {
          idResume: "3e45512e-34er-22dd-a645-f5d7856998tr",
          name: "Jose Ecos",
        },
        creationDate: "2015-05-22T14:56:28.000Z",
        description: "Centralize resumes and projects",
        id: "5a7939fd-59de-44bd-a092-f5d8434584de",
        logo: "./logo.svg",
        memberList: [
          {
            idResume: "6g45454r-56uy-65dr-a362-f5d5849859hg",
            name: "Raul Gamarra",
          },
          {
            idResume: "3e45512e-34er-22dd-a645-f5d7856998tr",
            name: "Cristian Chavez",
          },
          {
            idResume: "3e45543h-34er-22dd-a645-f5d7856998tr",
            name: "Martin Callejas",
          },
        ],
        name: "TeamUp",
        state: 1,
        textInvitation:
          "We invite you to collaborate with the development team",
      },
    };
    return result;
  } catch (error) {
    if (error.response) {
      alert(error);
    } else if (error.request) {
      alert(error);
    } else {
      alert("Error: Something is wrong");
    }
    handlerError = true;
    return handlerError;
  }
}
