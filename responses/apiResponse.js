const apiResponse = (message, status, code, data) => {
  return {
    meta: {
      message,
      status,
      code,
    },
    data,
  };
};
const apiResponseBadRequest = (message) => {
  return {
    meta: {
      message: "Bad request",
      status: "error",
      code: 400,
    },
    data: message,
  };
};

const apiResponseNotFound = (message) => {
  return {
    meta: {
      message: "Not Found",
      status: "error",
      code: 404,
    },
    data: message,
  };
};

const apiResponseConflict = (message) => {
  return {
    meta: {
      message: "Conflict",
      status: "error",
      code: 409,
    },
    data: message,
  };
};
module.exports = {
  apiResponse,
  apiResponseBadRequest,
  apiResponseNotFound,
  apiResponseConflict,
};
