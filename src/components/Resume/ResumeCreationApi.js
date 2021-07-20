import axios from "axios";

export async function postResume(resume) {
  try {
    await axios.post("http://localhost:7071/api/resumes", resume);
    return { ok: true };
  } catch (err) {
    alert("Couldn't save your profile, please try again");
    return { ok: false };
  }
}
