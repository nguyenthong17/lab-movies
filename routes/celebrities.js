const router = require('express').Router();
const Celebrity = require('../models/Celebrity')

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
            .then(celebrityFromDB => {
                // console.log(celebrityFromDB)
                // res.send(celebrityFromDB)
                res.render('../views/celebrities/index', {celebrityList: celebrityFromDB})
            })
            .catch(err => next(err))
})

router.get('/celebrities/add', (req, res, next) => {
    res.render('celebrities/addForm')
})

router.post('/celebrities', (req, res, next) => {
    // console.log(req.body)
    const {name, ocupation, catchPhrase} = req.body;
    Celebrity.create({
        name,
        ocupation,
        catchPhrase
    })
            .then(newCelebrity => {
                res.redirect(`/celebrities/${newCelebrity._id}`)
            })
            .catch(err => next(err))
})

router.get('/celebrities/:id/delete', (req, res, next) => {
    const id = req.params.id;
    Celebrity.findByIdAndDelete(id)
            .then(() => {
                res.redirect('/celebrities')
            })
})

router.get('/celebrities/:id/edit', (req, res, next) => {
    const id = req.params.id;
   
    Celebrity.findById(id)
            .then(foundCelebrity => {
                res.render('celebrities/editForm', {foundCelebrity})
            })
            .catch(err => next(err))
})

router.post('/celebrities/:id/edit',(req, res, next) => {
    const id = req.params.id;
    const {name, ocupation, catchPhrase} = req.body;
    Celebrity.findByIdAndUpdate(id, {
                name,
                ocupation,
                catchPhrase
            }, {new: true})
            .then(updatedCelebrity => {
                console.log(updatedCelebrity)
                res.redirect(`/celebrities/${updatedCelebrity._id}`)
            })
})

router.get('/celebrities/:id', (req, res, next) => {
    const id = req.params.id;
    Celebrity.findById(id)
            .then(foundCelebrity => {
                res.render('celebrities/details', {foundCelebrity})
            })
            .catch(err => next(err))
})
module.exports = router;