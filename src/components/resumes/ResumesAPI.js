import axios from "axios";

export async function postResume(resume) {
  try {
    const result = await axios.post(
      "http://localhost:7071/api/resumes",
      resume
    );
    if (result.status === 200) {
      return { ok: true };
    } else {
      result.ok = false;
      result.statusText = "Data not saved";
    }
    console.log(result.statusText);
    return result;
  } catch (err) {
    alert("Couldn't save your profile, please try again");
    return { ok: false };
  }
}

export default async function get() {
  let errorRevise = false;
  try {
    let { data: result } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    result = [
      {
        // Testing that the list is displayed with the requested information
        address: {
          city: "Bolivia",
          street: "America",
        },
        contact: {
          email: "filibertoAlarcon@gmail.com",
        },
        creationDate: "2021-09-03T14:56:28.000Z",
        email: "segundo corre",
        id: 1,
        lastUpdateDate: "2006-05-22T17:14:03.000Z",
        phone: "1-770-736-8031 x56442",
        title: "Filiberto Alarcon",
        username: "Parkt",
        website: "geo-industri.org",
      },

      {
        address: {
          city: "Bolivia",
          street: "Aroma",
        },
        contact: {
          email: "Juan.Perez@gmail.com",
        },
        creationDate: "2008-09-13T09:21:59.4586",
        email: "segundo corre",
        id: 1,
        lastUpdateDate: "2015-05-22T09:21:01.000Z",
        phone: "1-770-736-8031 x56442",
        title: "Juan Perez",
        username: "Parkt",
        website: "geo-industri.org",
      },

      {
        address: {
          city: "Bolivia",
          street: "Pacheco",
        },
        contact: {
          email: "lina.ramirez@gamil.com",
        },
        creationDate: "2006-11-09T14:56:28.000Z",
        email: "segundo corre",
        id: 1,
        lastUpdateDate: "2018-11-09T14:56:28.000Z",
        phone: "1-770-736-8031 x56442",
        title: "Lina Ramirez",
        username: "Parkt",
        website: "geo-industri.org",
      },
    ];
    return result;
  } catch (err) {
    if (err.response) {
      alert(err);
    } else if (err.request) {
      alert(err);
    } else {
      alert("Error: Check the information, something is wrong.");
    }
    return errorRevise;
  }
}
