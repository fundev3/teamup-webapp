import axios from "axios";

export async function PostResume(resume) {
  try {
    const result = await axios.post(
      //"http://localhost:7071/api/resumes",
      "https://jsonplaceholder.typicode.com/posts",
      resume
    );
    //return result.data
    console.log(result.data);
  } catch (err) {
    alert("Couldn't save your profile, please try again");
  }
}
