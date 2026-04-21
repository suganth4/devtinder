const connectionRqService = require("../services/connectionRequest.service");

const connectionRqController = {
    connectionRequest: async (req, res, next) => {
        try {
            await connectionRqService.connectionRequest(req)
            res.send({
                success: true,
                message: 'Connection request sent successfully'
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = connectionRqController;