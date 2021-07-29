import axios from "axios";

export async function postResume(resume) {
  try {
    const resumes = await axios.post(
      "http://localhost:7071/api/resumes",
      resume
    );

    return resumes;
  } catch (err) {
    // TODO error handling
    alert("Couldn't save your profile, please try again");
    return;
  }
}

export async function getResumes() {
  try {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    return data;
  } catch (error) {
    // TODO error handling
    if (error.response) {
      alert(error);
    } else if (error.request) {
      alert(error);
    } else {
      alert("Error: Something is wrong");
    }

    return [];
  }
}
