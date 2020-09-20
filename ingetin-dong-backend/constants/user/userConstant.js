module.exports = {
  USER_STATUS: {
    ACTIVE: { desc: "Active User", value: "01" },
    DORMANT: { desc: "Deactivated User", value: "02" },
    DELETED: { desc: "Permanently Deleted User", value: "03" },
    BLOCKED: { desc: "Blocked User", value: "04" },
    NOTACTIVATED: {
      desc: "New Join, but haven't activate account",
      value: "05"
    }
  }
};
