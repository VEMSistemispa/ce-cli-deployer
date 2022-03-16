const { v4: uuidv4 } = require("uuid");


class GuidFactory {
    static newGuid(){
        return uuidv4();
    }
}

module.exports  = {
    GuidFactory: GuidFactory
}