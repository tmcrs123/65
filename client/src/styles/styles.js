import {
  red500 as red,
  green500 as green,
  pink500 as pink,
  yellow500 as yellow,
  cyan500 as cyan,
  bluee500 as blue
} from "material-ui/styles/colors";

export const colors = {
  red,
  green,
  pink,
  yellow,
  cyan,
  blue
};

export const styles = {
  buttonMargin: {
    marginRight: "10px"
  },
  header: {
    button: {
      marginRight: "10px"
    }
  },
  iconButton: {
    smallIconGreen: {
      width: 36,
      height: 36,
      color: green
    },
    smallIconRed: {
      width: 36,
      height: 36,
      color: red
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
    margin: "20px",
    height: "400px"
  },
  customerLogin: {
    paper: {
      padding: "30px",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "60px",
      height: "400px",
      width: "500px"
    },
    button: {
      color: "white",
      width: 120,
      heigth: 40
    }
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
    },
    icon: {
      height: "40px",
      width: "40px",
      marginRight: "10px",
      verticalAlign: "top"
    }
  },
  editReservation: {
    paper: {
      height: "550px",
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
    },
    tableFont: {
      header: {
        fontSize: 16,
        textAlign: "center"
      },
      row: {
        fontSize: 16,
        textAlign: "center"
      }
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
    margin: "auto",
    align: "center"
  },
  textField: {
    marginBottom: "50px"
  },
  pricesDashboard: {
    dateIntervals: {
      paper: {
        padding: "20px",
        margin: "10px",
        width: "300px",
        borderLeft: "8px solid",
        borderColor: cyan
      },
      dateIntervalsList: {
        paper: {
          padding: "20px",
          margin: "10px",
          height: "300px",
          overflowX: "auto",
          borderLeft: "8px solid",
          borderColor: cyan
        }
      },
      submitButton: {
        marginTop: "10px"
      },
      icon: {
        height: "30px",
        width: "30px",
        marginRight: "10px"
      },
      textSpan: {
        verticalAlign: "top"
      },
      noMargin: {
        marginBottom: "0px",
        marginTop: "0px"
      },
      table: {
        fontSize: "14px",
        textAlign: "center"
      }
    },
    marginForm: {
      paper: {
        padding: "20px",
        margin: "10px",
        width: "300px",
        borderLeft: "8px solid",
        borderColor: cyan
      },
      submitButton: {
        marginTop: "10px"
      }
    },
    defaultPrice: {
      paper: {
        padding: "20px",
        margin: "10px",
        width: "300px",
        borderLeft: "8px solid",
        borderColor: cyan
      },
      submitButton: {
        marginTop: "10px"
      }
    }
  },
  AdminDashboard: {
    availabilityCheck: {
      paper: {
        padding: "20px",
        margin: "10px",
        height: "200px",
        borderLeft: "8px solid",
        borderColor: cyan
      },
      fields: {
        marginRight: "10px"
      }
    },
    infoCard_month: {
      borderLeft: "8px solid",
      borderColor: cyan
    },
    infoCard_customer: {
      borderLeft: "8px solid",
      borderColor: cyan
    },
    infoCard_approved: {
      borderLeft: "8px solid",
      borderColor: green
    },
    infoCard_pending: {
      borderLeft: "8px solid",
      borderColor: yellow
    },
    infoCard_rejected: {
      borderLeft: "8px solid",
      borderColor: red
    },
    availableSpan: {
      color: green,
      borderBottom: "2px solid",
      borderColor: green
    },
    unavailableSpan: {
      color: red,
      borderBottom: "2px solid",
      borderColor: red
    },
    icon: {
      height: "40px",
      width: "40px",
      marginRight: "10px",
      marginLeft: "10px",
      paddingBottom: "10px",
      verticalAlign: "top"
    },
    nextReservationList: {
      borderLeft: "8px solid",
      borderColor: cyan
    }
  },
  sidebar: {
    menuItem: {
      fontSize: "18px"
    },
    sidebarDiv: {
      padding: 0,
      height: "100vh",
      border: "1px solid rgba(0,0,0,0.12)"
    }
  },
  rightSide: {
    backgroundColor: "#EDECEC",
    height: "100vh"
  },
  body: {
    margin: 0,
    padding: 0
  },
  noMargin: {
    margin: 0
  },
  adminAvailability: {
    icon: {
      height: "40px",
      width: "40px",
      marginRight: "10px",
      verticalAlign: "top"
    },
    dateCheckPhrase: {
      text: {
        display: "inline-block",
        fontSize: "20px"
      },
      checkHeader: {
        verticalAlign: "bottom"
      },
      datePicker: {
        textFieldStyle: {
          fontSize: 20
        },
        style: {
          display: "inline-block",
          width: "150px"
        }
      }
    }
  }
};
