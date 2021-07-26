import axios from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});
// when the connection to the backend API is made, the corresponding Json will be placed.
export default async function getResumeList() {
  let errorRevise = true;
  try {
    let result = await instance.get("/users").data;
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
