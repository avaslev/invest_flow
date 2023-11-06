// A helper function to assert the request ID param is valid
// and convert it to a number (since it comes as a string by default)
function getIdParam(req) {
	return req.params.id;
}

module.exports = { getIdParam };
