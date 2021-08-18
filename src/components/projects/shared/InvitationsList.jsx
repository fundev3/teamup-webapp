import { getProjects } from "../ProjectsAPI.js";
import { useState } from "react";

function InvitationsList() {
  const [invitations, setInvitations] = useState({});
  async function fetchData() {
    const response = await getProjects();
    setInvitations(response);
  }
  fetchData();
  return <div>{invitations.map((invitation) => invitations.id)}</div>;
}

export default InvitationsList;
