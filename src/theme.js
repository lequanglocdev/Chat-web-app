import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
// Create a theme instance.

const HEIGHT_SEARCH_TAB = "64px";
const HEIGHT_LIST_TAB = `calc(100vh - ${HEIGHT_SEARCH_TAB})`;
const WIDTH_CHAT_WIDTH = "334px";
const WIDTH_CONTAINER_CHAT = `calc(100% - ${WIDTH_CHAT_WIDTH})`;
const theme = extendTheme({
  zalo: {
    asideChatWidth: WIDTH_CHAT_WIDTH,
    heightSearch: HEIGHT_SEARCH_TAB,
    heightList: HEIGHT_LIST_TAB,
    widthContainerChat: WIDTH_CONTAINER_CHAT,
  },
  // palette: {
  //   primary: {
  //     main: "#556cd6",
  //   },
  //   secondary: {
  //     main: "#19857b",
  //   },
  //   error: {
  //     main: red.A400,
  //   },
  // },
  colorSchemes: {
    //
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: "8px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border:"1px solid #34495e",
          boxShadow: "none",
        },
      },
    },
   
  },
});

export default theme;
