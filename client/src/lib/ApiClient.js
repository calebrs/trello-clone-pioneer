import axios from "axios";
import * as routes from "../constants/ApiRoutes";

function logError(errorResponse) {
  const response = errorResponse.response;

  if (response && response.data && response.data.error) {
    console.error(`HTTP Error: ${response.data.error}`);
  } else {
    console.error("Error: ", errorResponse);
  }
}

function unwrapData(response) {
  return response.data;
}

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Accept"] = "application/json";

const apiClient = {
  getBoards: function(callback) {
    return axios
      .get(routes.BOARDS_INDEX_URL)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createBoard: function(board, callback) {
    return axios
      .post(routes.CREATE_BOARD_URL, {board})
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  getBoard: function(id, callback) {
    return axios
      .get(`${routes.BOARDS_INDEX_URL}/${id}`)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createList: function(list, callback) {
    return axios
      .post(routes.LISTS_URL, {...list})
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  updateList: function(id, updatedFields, callback) {
    return axios
      .put(`${routes.LISTS_URL}/${id}`, {...updatedFields})
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  }
};

export default apiClient;
