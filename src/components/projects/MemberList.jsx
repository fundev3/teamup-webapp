import DeleteIcon from "@material-ui/icons/Delete";
import { useState } from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";

const dummyMemberList = [
  {
    idResume: "c32a0620-28b0-41e3-9a90-fd0e0612f248",
    isSelected: false,
    name: "Pedro",
  },
  {
    idResume: "fe8b4d19-c49a-43e8-affc-45d3d2993420",
    isSelected: false,
    name: "Rodrigo",
  },
  {
    idResume: "594497bc-69e7-43fa-8717-d7bb7fcbf586",
    isSelected: false,
    name: "Lilian",
  },
  {
    idResume: "32954015-a8e7-4b45-9f67-6af2c20a66d0",
    isSelected: false,
    name: "Paulo",
  },
  {
    idResume: "918dba49-e4e0-47e9-aa29-fa1a0244faa7",
    isSelected: false,
    name: "Alejandro",
  },
  {
    idResume: "aa2a6ac0-9937-4794-bf46-947956b22dad",
    isSelected: false,
    name: "Freddy",
  },
];

function MemberList({ memberList, setMemberList }) {
  const [member, setMember] = useState("");
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

  return (
    <>
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
    </>
  );
}

export default MemberList;
