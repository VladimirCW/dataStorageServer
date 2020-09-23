const models = require('../models');

const patchSampleById = (req, res) => {
    const newSamplesArray = req.body.split(" ").map(i => {
        return {
            "sampleName": i,
            "dto": Date.now()
        };
    })
    models.Sample.findOneAndUpdate({ id: req.params.id }, { $push: { sampleNames: {$each: newSamplesArray} } }, (err, data) => {
        if (err) console.log(err);
        res.send(`Sample with id: '${req.body}' was pushed to data set '${req.params.id}'`).end();
    });
};

const deleteSample = (req, res) => {
    console.log(`${JSON.stringify(req.params)}`);
    
    models.Sample.findOneAndDelete({ id: req.params.id }, (err, data) => {
        if (err) {
            console.log(err);
        }
        if(data) {
            res.send(`Sample with id: '${data.id}' was deleted`).end();
        } else {
            res.status(404).end();
        }
        
    });
};

const getSampleById = (req, res) => {
    models.Sample.find({ id: req.params.id }, {_id: 0, id: 1, description: 1, "sampleNames.sampleName": 1, "sampleNames.dto": 1}, (err, data) => {
        if (err) console.log(err);
        res.status(200).json(data);
    });
};

const createSample = (req, res) => {
    const body = {
        id: req.params.id,
        description: req.body.description,
        sampleNames: []
    };
    if(typeof req.body.sampleName === "string") {
        body.sampleNames.push( {
            sampleName: req.body.sampleName,
            dto: Date.now()
        });
    } else {
        body.sampleNames = req.body.sampleName.map(i => {
            return {
                sampleName: i,
                dto: Date.now()
            };
        })
    }
    
    models.Sample.create(body, (err, data) => {
        if(err) console.log(err);
        res.send(`Sample with id: '${data.id}' was created`).end();
    });
};

const getAllSamples = (req, res) => {
    models.Sample.find({}, {_id: 0, id: 1, description: 1, "sampleNames.sampleName": 1, "sampleNames.dto": 1}, (err, data) => {
        if (err) console.log(err);
        res.status(200).json(data);
    });
};

const useSampleById = (req, res) => {
    models.Sample.findOneAndUpdate({ id: req.params.id }, { $pop: {sampleNames: -1} }, (err, data) => {
        if (err) console.log(err);
        if(data.sampleNames.length) {
            res.send(`Sample with id: '${data.sampleNames[0].sampleName}' that was created at '${data.sampleNames[0].dto}' can be used for data set '${req.params.id}'`).end();
        } else {
            res.send(`There is no identifiers for data set '${req.params.id}'`).end();
        }
        
    });
}

module.exports = {
    getAllSamples,
    createSample,
    deleteSample,
    getSampleById,
    patchSampleById,
    useSampleById
};