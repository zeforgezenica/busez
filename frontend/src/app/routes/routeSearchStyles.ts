import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#333",
          color: "#b3b3b3",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#b3b3b3",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#b3b3b3",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#b3b3b3",
          },
        },
        input: {
          color: "#b3b3b3",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#b3b3b3",
          "&.Mui-focused": {
            color: "#b3b3b3",
          },
        },
      },
    },
    MuiDayCalendar: {
      styleOverrides: {
        weekDayLabel: {
          color: "#b3b3b3",
        },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        root: {
          backgroundColor: "#333",
        },
        iconButton: {
          color: "#b3b3b3",
          "&:hover": {
            backgroundColor: "#555",
          },
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: "#b3b3b3",
          backgroundColor: "#333",
          "&:hover": {
            backgroundColor: "#555",
          },
        },
        dayToday: {
          borderRadius: "50%",
          border: "2px solid #b3b3b3",
          color: "#b3b3b3",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#333",
          color: "#b3b3b3",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#b3b3b3",
          "&:hover": {
            backgroundColor: "#555",
          },
        },
      },
    },
  },
});

export const customSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    background: "#333",
    borderColor: "#666",
    color: "#fff",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    background: state.isSelected ? "#444" : "#333",
    color: state.isSelected ? "#fff" : "#ccc",
    "&:hover": {
      background: "#555",
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#fff",
  }),
  input: (provided: any) => ({
    ...provided,
    color: "#fff",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#ccc",
  }),
  menu: (provided: any) => ({
    ...provided,
    zIndex: 1000,
  }),
};
