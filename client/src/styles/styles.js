import { red800, green800 } from "material-ui/styles/colors";

export const styles = {
  iconButton: {
    smallIconGreen: {
      width: 36,
      height: 36,
      color: green800
    },
    smallIconRed: {
      width: 36,
      height: 36,
      color: red800
    },
    smallIcon: {
      width: 36,
      height: 36
    },
    small: {
      width: 72,
      height: 72,
      padding: 16
    }
  },
  paper: {
    padding: "30px",
    margin: "20px"
  },
  adminLogin: {
    paper: {
      padding: "30px",
      margin: "20px"
    },
    signIn: {
      marginTop: "20px"
    }
  },
  createReservation: {
    paper: {
      height: "500px",
      padding: "20px",
      marginTop: "20px"
    }
  },
  editReservation: {
    paper: {
      height: "500px",
      padding: "20px",
      marginTop: "20px"
    }
  },
  submitButton: {
    marginRight: "20px",
    marginTop: "30px"
  },
  table: {
    paper: {
      padding: "20px",
      margin: "10px"
    }
  },
  search: {
    marginRight: "10px",
    marginBottom: "60px",
    fontSize: "40px",
    textfield: {
      fontSize: "22px"
    }
  },
  chip: {
    margin: 3
  },
  textField: {
    marginBottom: "50px"
  },
  pricesDashboard: {
    dateIntervals: {
      paper: {
        padding: "20px",
        margin: "10px",
        width: "300px"
      },
      submitButton: {
        marginTop: "10px"
      }
    },
    marginForm: {
      paper: {
        padding: "20px",
        margin: "10px",
        width: "300px"
      },
      submitButton: {
        marginTop: "10px"
      }
    },
    defaultPrice: {
      paper: {
        padding: "20px",
        margin: "10px",
        width: "300px"
      },
      submitButton: {
        marginTop: "10px"
      }
    },
    defaultPriceList: {
      paper: {
        padding: "20px",
        margin: "10px",
        height: "300px",
        overflowX: "auto"
      }
    }
  },
  AdminDashboard: {
    availabilityCheck: {
      paper: {
        padding: "20px",
        margin: "10px",
        height: "200px"
      },
      fields: {
        marginRight: "10px"
      }
    },
    infoCard: {
      borderLeft: "8px solid red"
    }
  }
};
