import Box from "@mui/material/Box";
import Profile from "../../../components/Profile";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import TextsmsIcon from "@mui/icons-material/Textsms";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import * as React from "react";
import ChatHome from "./Chat";
import PhoneBook from "./PhoneBook";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const TabBar = ({ message, selectedTabIndex, onTabChange }) => {
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    onTabChange(newValue);
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        maxHeight: "100vh",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            backgroundColor: "primary.light",
            width: (theme) => theme.zalo.navWidth,
            paddingTop: "30px",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Profile />
          </Box>

          <Tab
            sx={{}}
            label={<TextsmsIcon sx={{ color: "#fff", fontSize: "28px" }} />}
            {...a11yProps(1)}
          />

          <Tab
            label={
              <PermContactCalendarIcon
                sx={{ color: "#fff", fontSize: "28px" }}
              />
            }
            {...a11yProps(2)}
          />
        </Tabs>

        <Box sx={{ width: "100%" }}>
          <TabPanel value={value} index={1}>
            <ChatHome />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <PhoneBook />
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
};

export default TabBar;
