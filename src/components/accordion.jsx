import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography"; // Import Typography component
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import { Box, Button, MenuItem, Select, TextareaAutosize } from "@mui/material";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Popover from "@mui/material/Popover";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ParentBox = styled(Box)`
  display: flex;
`;
const Childele = styled(Box)`
  padding: 20px;
`;

export default function Cardele({
  firstName,
  lastName,
  age,
  gender,
  country,
  description,
  picture,
  onDelete,
}) {
  const [editToggle, seteditToggle] = useState(false);
  const [originalData, setOriginalData] = useState({
    name: firstName + " " + lastName,
    age,
    gender,
    country,
    description,
    picture,
  });
  const [editedData, setEditedData] = useState({
    name: firstName + " " + lastName,
    lastName,
    age,
    gender,
    country,
    description,
    picture,
  });
  // const [Genderedata, setGenderedata] = React.useState("Male");
  // useEffect(() => {
  //   setGenderedata(gender);
  // }, [gender]);

  const handleEdittoggle = () => {
    if (!editToggle) {
      // Enter edit mode
      setOriginalData({ ...editedData }); // Store original data
    }
    seteditToggle(!editToggle);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    onDelete(); // Call the onDelete function passed from the parent component
    handleClose(); // Close the modal after deletion
  };

  const handleSaveChanges = () => {
    // Save changes and exit edit mode
    setOriginalData({ ...editedData });
    seteditToggle(false);
  };

  const handleCancelChanges = () => {
    // Discard changes and exit edit mode
    setEditedData({ ...originalData });
    seteditToggle(false);
  };
  return (
    <div style={{ margin: "20px", padding: "10px" }}>
      <Accordion style={{ width: "100%" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <img
            src={originalData.picture}
            alt={originalData.name}
            height={50}
            width={50}
            style={{ paddingRight: "20px", borderRadius: "100%" }}
          />
          <Typography
            style={{
              fontWeight: "bold",
              padding: "4px",
              border: editToggle ? "1px solid #8c918d" : "none",
              borderRadius: "7px",
            }}
          >
            {editToggle ? (
              <TextField
                name="name"
                value={editedData.name}
                onChange={handleChange}
                type="text"
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
                style={{
                  textDecoration: "none !important",
                  outline: "none",
                  padding: "4px",
                  borderRadius: "7px",
                }}
              />
            ) : (
              `${originalData.name}`
            )}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ParentBox>
            <Childele>
              <Typography style={{ paddingLeft: editToggle ? "0px" : "5px" }}>
                Age
              </Typography>
              <TextField
                name="age"
                value={editToggle ? editedData.age : originalData.age}
                onChange={handleChange}
                type="text"
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
                style={{
                  textDecoration: "none !important",
                  outline: "none",
                  border: editToggle ? "1px solid #8c918d" : "none",
                  padding: "4px",
                  borderRadius: "7px",
                }}
              />
            </Childele>
            <Childele>
              <Typography style={{ paddingLeft: editToggle ? "0px" : "15px" }}>
                Gender
              </Typography>
              <Select
                name="gender"
                value={editToggle ? editedData.gender : originalData.gender}
                onChange={handleChange}
                variant="standard"
                disabled={editToggle ? false : true}
                sx={{
                  boxShadow: "none",
                  ".MuiOutlinedInput-notchedOutline": { border: 0 },
                }}
                style={{
                  padding: "4px",
                  border: editToggle ? "1px solid #8c918d" : "none",
                  borderRadius: "7px",
                  height: "45px",
                }}
              >
                <MenuItem value="male">male</MenuItem>
                <MenuItem value="female">female</MenuItem>
                <MenuItem value="transgender">transgender</MenuItem>
                <MenuItem value="rather not say">rather not say</MenuItem>
                <MenuItem value="other">other</MenuItem>
              </Select>
            </Childele>
            <Childele>
              <Typography>Country</Typography>
              <TextField
                id="standard-search"
                name="country"
                value={editToggle ? editedData.country : originalData.country}
                onChange={handleChange}
                type="search"
                variant="standard"
                InputProps={{
                  readOnly: editToggle ? false : "readonly",
                  disableUnderline: true,
                }}
                style={{
                  padding: "5px",
                  border: editToggle ? "1px solid #8c918d" : "none",
                  borderRadius: "7px",
                }}
              />
            </Childele>
          </ParentBox>
          <Childele>
            <Typography>Description</Typography>
            <TextareaAutosize
              id="standard-search"
              name="description"
              value={
                editToggle ? editedData.description : originalData.description
              }
              onChange={handleChange}
              type="search"
              variant="standard"
              InputLabelProps={{ shrink: false }}
              style={{
                width: "100%",
                padding: "4px",
                border: editToggle ? "1px solid #8c918d" : "none",
                borderRadius: "7px",
              }}
              readOnly={editToggle ? false : true}
            />
          </Childele>
        </AccordionDetails>
        <AccordionActions>
          {editToggle ? (
            <Box>
              <CloseIcon
                style={{ margin: "7px" }}
                onClick={handleCancelChanges}
              />
              <DoneIcon style={{ margin: "7px" }} onClick={handleSaveChanges} />
            </Box>
          ) : (
            <Box>
              <DeleteOutlineIcon
                style={{ margin: "7px" }}
                onClick={handleOpen}
              />
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 600,
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <Typography id="modal-modal-description">
                    Are you sure you want to delete this entry?
                  </Typography>
                  <Typography>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        height: "100%",
                        marginTop: "25px",
                      }}
                    >
                      <Button variant="text" onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button variant="text" onClick={handleDelete}>
                        Delete
                      </Button>
                    </Box>
                  </Typography>
                </Box>
              </Modal>
              <EditIcon style={{ margin: "7px" }} onClick={handleEdittoggle} />
            </Box>
          )}
        </AccordionActions>
      </Accordion>
    </div>
  );
}
