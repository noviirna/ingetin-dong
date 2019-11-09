module.exports = {
  statusCode: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403
  },
  statusMessage: {
    OK: "Request successfully processed",
    CREATED: "Request successfully created/updated",
    BAD_REQUEST: "Bad request",
    INTERNAL_SERVER_ERROR: "Internal server error, try again later",
    NOT_FOUND: "Page is not found",
    UNAUTHORIZED: "You are not allowed to see this",
    UNAUTHORIZED: "Forbidden",
  }
};
