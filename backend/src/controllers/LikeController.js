const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        const  { devId } = req.params;
        const  { user } = req.headers;
        
        const loggerDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if(!targetDev){
            return res.status(400).json({ error: 'Dev not exists'});
        }

        if(targetDev.likes.includes(loggerDev._id)){
            console.log('deu match');
        }

        
        if(!(loggerDev.likes.includes(targetDev._id))){
            loggerDev.likes.push(targetDev._id);
            await loggerDev.save()
        }

        return res.json(loggerDev);
    }
};