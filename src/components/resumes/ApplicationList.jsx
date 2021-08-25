import React, { useEffect, useState } from "react";

function ApplicationList() {
  useEffect(() => {
    async function data() {
      // const applicationsData = await getApplications(idResume);
      // const applicationsData = await getInvitationsByResume(idResume);
      // setApplications(applicationsData);
    }
    data();
  }, []);

  const [applications, setApplications] = useState([]);

  return <div className="Applications-List"></div>;
}
export default ApplicationList;
