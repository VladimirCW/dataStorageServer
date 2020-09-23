const router = require('express').Router();
const controlers = require('../controlers');

router.route('/samples')
    .get(controlers.SampleControler.getAllSamples);

router.route('/samples/:id')
    .get(controlers.SampleControler.getSampleById)
    .put(controlers.SampleControler.createSample)
    .delete(controlers.SampleControler.deleteSample)
    .patch(controlers.SampleControler.patchSampleById);

router.route('/samples/:id/use')
    .get(controlers.SampleControler.useSampleById);


module.exports = router;