var express = require('express');
var router = express.Router();
var createError = require('http-errors');


const todos= [
    {id:1, name:"Do somthing", completed:false},
    {id:2, name:"let do it", completed:false}
]


/* GET users listing. */
// /todos
router.get('/', function(req, res, next) {
  res.json(todos)
});



router.get('/:id', (req,res,next)=>{
    const id = req.params.id;
    const todo = todos.find((value)=> value.id === Number(id));
    if(!todo){
        // 404
        return next(createError(404, 'Not found'))
    }
    res.json(todo)
})


router.post('/', (req,res,next)=>{
    const { name } = req.body;
    const id = todos.length + 1;

    if(typeof name !== 'string'){
        return next(createError(422, 'validator error'))
    }
    const todo = {
        id,
        name,
        completed: false
    }
    todos.push(todo);

    res.status(201).json(todo)

})
module.exports = router;
