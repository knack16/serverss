const router = require('express').Router()
const auth = require('../middleware/auth')
const Property= require('../models/property')
const{check , validationResult}=require('express-validator')

router.get('/',auth ,async(req,res)=>{
    try {
        const propertys=await  Property.find({user:req.user.id})
        res.json(propertys)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})

router.post('/',auth,
[
    [check('name','Please provide a name').not().isEmpty()],
    [check('phone','Please provide a valid phone').not().isEmpty()],
    [check('address','Please provide a valid address').not().isEmpty()],
    [check('rent','Please provide a rent').not().isEmpty()],
    [check('email','Please provide a valid email').not().isEmpty()],
    [check('date','Please provide a valid date').not().isEmpty()],
],
async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }
    const {name,phone,address,rent,email,date} =req.body
    try {
        let property =new Property({
            user:req.user.id,
            name,phone,address,rent,email,date
        })

        property= await property.save()
        res.json(property)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

router.delete('/:id',auth,async(req,res)=>{
    try {
        let property =await Property.findById(req.params.id)
        if(!property){
            return res.status(404).json({msg:'property not found'})
        }
        await Property.findByIdAndRemove(req.params.id)
        res.send('property removed')
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

router.put('/:id',auth,async(req,res)=>{
    const {name,phone,address,rent,email,date}=req.body
    const updatedProperty={name,phone,address,rent,email,date}
    try {
        let property =await Property.findById(req.params.id)
        if(!property){
            return res.status(404).json({msg:'property not found'})
        }
        property = await Property.findByIdAndUpdate(req.params.id,{$set:updatedProperty},{new:true})
        res.send(property)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router