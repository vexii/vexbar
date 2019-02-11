const UPDATE_TITLE = "UPDATE_TITLE";

module.exports = {
  UPDATE_TITLE,
  updateTitle: (title) => {
    return {
      type: UPDATE_TITLE,
      payload: { 
        title
      },
    };
  },
};
