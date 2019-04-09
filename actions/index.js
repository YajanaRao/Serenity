export const updateQuery = (query) => dispatch => {
  console.log("In Action",query)
  dispatch({
    type: 'UPDATE_QUERY',
    payload: query
  });
}

export const updateTheme = () => dispatch => {
  dispatch({
    type: 'UPDATE_THEME',
  })
}