const { describe, it } = require('mocha');
const {assert, expect} = require('chai');
const TaskManager = require('../js/TaskManager').TaskManager;


describe('Task Manager', () => {
    describe('Addtask', () =>{
        it('Should check for empty array', () => {
         //setup
         const task = new TaskManager();
         console.log('taskname', task.tasks);
         //exercise
         const result =task.tasks
         //Verify
         assert.deepEqual(result, []);
        })
         it('Should get addtask info', () => {
             //setup
             const task = new TaskManager();
         //examine
         const result = task.tasks;               
         task.addTask('name', 'description', 'assignedTo', 'dueDate');
         console.log('taskname1', task);
         //verify
         assert.deepEqual(result, task.tasks);
        })
        
    }) 
    describe('getTaskById', () =>{
        it('should check for the id', () => {
        //setup
        const task = new TaskManager();
        const inputId = 0;
        const expectedResult = 0;
        const res = task.addTask('name', 'description', 'assignedTo', 'dueDate');
           //exercise
         const result = task.getTaskById(inputId);
         console.log('hema1', result);
         //Verify
          assert.equal(expectedResult, result.id);
        })
    })
    
    describe('deleteTask', () =>{
        it('it should delete the task', () => {
            const task = new TaskManager();
            task.addTask('name', 'description', 'assignedTo', 'dueDate');
            //exercise
        const taskId = task.tasks[0];
         //Verify
        expect(taskId).to.not.be.empty
        task.deleteTask(taskId.id);
        expect(task.tasks).to.be.empty
      
          
         
           
        })
    }) 
})
