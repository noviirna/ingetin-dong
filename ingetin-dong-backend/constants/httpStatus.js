module.exports = {
  statusCode: {
    OK : 200,
    CREATED : 201,
    BAD_REQUEST : 400,
    INTERNAL_SERVER_ERROR : 500,
    NOT_FOUND : 404
  },
  statusMessage : {
    OK : "Request successful",
    CREATED : "Request successfully created/updated",
    BAD_REQUEST : "Bad request",
    INTERNAL_SERVER_ERROR : "Internal server error, try again later",
    NOT_FOUND : "Page is not found"
  }
}