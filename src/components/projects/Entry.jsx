import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { entry as entryValidations } from "./helpers/validations";
import { useFormik } from "formik";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./Entry.scss";

const dummyMemberList = [
  { idResume: 1, isSelected: false, name: "Pedro" },
  { idResume: 2, isSelected: false, name: "Rodrigo" },
  { idResume: 3, isSelected: false, name: "Lilian" },
  { idResume: 4, isSelected: false, name: "Paulo" },
  { idResume: 5, isSelected: false, name: "Alejandro" },
  { idResume: 6, isSelected: false, name: "Freddy" },
];

function Entry() {
  const search = useLocation().search;
  const idProject = new URLSearchParams(search).get("id");
  const formik = useFormik({
    initialValues: {
      contact: "Jose Ecos",
      description: "",
      logo: "",
      name: "",
      textInvitation: "",
    },
    // --> Waiting for API
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: entryValidations(),
  });
  const hasErrorDescription =
    !!formik.touched.description && !!formik.errors.description;
  const hasErrorName = !!formik.touched.name && !!formik.errors.name;
  const hasErrorLogo = !!formik.touched.logo && !!formik.errors.logo;
  const hasErrorTextInvitation =
    !!formik.touched.textInvitation && !!formik.errors.textInvitation;

  const handleChange = (event) => {
    const ID = event.target.value;
    const member = dummyMemberList.find((member) => member.idResume === ID);
    member.isSelected = true;
    setMember("");
    setMemberList([...memberList, member]);
  };
  const removeMember = (selectedMember) => {
    const member = dummyMemberList.find(
      (member) => member.idResume === selectedMember.idResume
    );
    const newMemberList = memberList.filter(
      (member) => member.idResume !== selectedMember.idResume
    );
    member.isSelected = false;
    setMemberList([...newMemberList]);
  };

  const [member, setMember] = useState("");
  const [memberList, setMemberList] = useState([]);

  return (
    <form
      autoComplete="off"
      className="container-form"
      noValidate
      onSubmit={formik.handleSubmit}
    >
      <h1 className="container-form__title">
        {idProject ? "Update Project" : "Create Project"}
      </h1>
      <p>Make your project know and hire the best resumes for it.</p>

      <div className="u-mb-1">
        <TextField
          data-testid="input-field"
          error={hasErrorName}
          helperText={hasErrorName ? formik.errors.name : ""}
          id="name"
          label="Name"
          name="name"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          value={formik.values.name}
          variant="outlined"
        />
      </div>

      <div className="u-mb-1">
        <TextField
          data-testid="input-field"
          error={hasErrorLogo}
          helperText={hasErrorLogo ? formik.errors.logo : ""}
          id="logo"
          name="logo"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="file"
          value={formik.values.logo}
          variant="outlined"
        />
      </div>

      <div className="u-mb-1">
        <TextField
          InputProps={{
            readOnly: true,
          }}
          data-testid="input-field"
          helperText="This is the owner contact"
          id="contact"
          label="Contact"
          name="contact"
          type="email"
          value={formik.values.contact}
          variant="outlined"
        />
      </div>

      <div className="u-mb-1">
        <TextField
          data-testid="input-field"
          error={hasErrorDescription}
          helperText={hasErrorDescription ? formik.errors.description : ""}
          id="description"
          label="Description"
          multiline
          name="description"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          rows={4}
          value={formik.values.description}
          variant="outlined"
        />
      </div>

      <div className="u-mb-1">
        <TextField
          data-testid="input-field"
          error={hasErrorTextInvitation}
          helperText={
            hasErrorTextInvitation ? formik.errors.textInvitation : ""
          }
          id="textInvitation"
          label="Text invitation"
          multiline
          name="textInvitation"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          rows={2}
          value={formik.values.textInvitation}
          variant="outlined"
        />
      </div>

      <div className="u-mb-1">
        <TextField
          data-testid="input-field"
          helperText="Select a list of members"
          id="member"
          label="Member"
          name="member"
          onChange={handleChange}
          select
          value={member}
          variant="outlined"
        >
          {dummyMemberList.map((option) => (
            <MenuItem
              disabled={option.isSelected}
              key={option.idResume}
              value={option.idResume}
            >
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <div className="u-mb-1">
        <Typography variant="h6">Your Member List</Typography>
        <div>
          <List dense={true}>
            {memberList.map((member) => (
              <ListItem key={member.idResume}>
                <ListItemText
                  primary={member.name}
                  secondary="Secondary text"
                />
                <ListItemSecondaryAction>
                  <IconButton
                    aria-label="delete"
                    edge="end"
                    onClick={() => removeMember(member)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>
      </div>

      <Button
        color="primary"
        data-testid="btn-form"
        type="submit"
        variant="contained"
      >
        {idProject ? "Update" : "Create"}
      </Button>
    </form>
  );
}
export default Entry;
