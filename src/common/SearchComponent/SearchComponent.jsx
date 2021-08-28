import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import "./SearchComponent.scss";

const useStyles = makeStyles((theme) => ({
  control: {
    padding: theme.spacing(2),
  },
  paper: {
    height: 140,
    width: 100,
  },
  root: {
    flexGrow: 1,
  },
  searchIcon: {
    color: "#ffffff",
  },
}));
function SearchComponent() {
  const classes = useStyles();
  return (
    <div className="search-box">
      <div className="search-box-input">
        <InputBase placeholder="Search Resume..." />
      </div>
      <div className="search-box-icon">
        <SearchIcon className={classes.searchIcon} />
      </div>
    </div>
  );
}

export default SearchComponent;
