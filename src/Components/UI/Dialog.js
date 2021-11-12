import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import { DialogContent } from "@material-ui/core";
import { Slide } from "@material-ui/core";
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, open, content, title } = props;

  const handleClose = () => {
    onClose();
  };

  //   const handleListItemClick = (value) => {
  //     onClose(value);
  //   };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      // style={{ transition: "all 0.5S linear", transform: "translate(0, 40px)" }}
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle
        id="simple-dialog-title "
        style={{ boxShadow: "3px 3px 10px" }}
      >
        {title}
      </DialogTitle>
      <DialogContent style={{ padding: "0" }}>{content}</DialogContent>
    </Dialog>
  );
}

export default SimpleDialog;
