import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FaPlus, FaTimes, FaChevronRight } from "react-icons/fa";
const ToDo = () => {
    const [toDo, setToDo] = useState('')
    const [toDos, setToDos] = useState([[], [], []])
    const dropableIds = ['droppableTasksToDo', 'droppableTasksInProgress', 'droppableTasksCompleted']
    const tasksFull = [...toDos]
    const CreateTaskList = (toDo) => {
        if (toDo) {
            const copiedToDos = [...tasksFull[0], { toDo, id: Date.now() }]
            tasksFull[0] = copiedToDos
            setToDos(tasksFull)
            setToDo('')
        }
    }
    const RemoveTask = (taskId,dropableArea) => {
        
        const droppableAreaIndex = dropableIds.indexOf(dropableArea)
        const removeingTask = toDos[droppableAreaIndex].find(item => item.id === taskId)
        const copiedToDos = [...toDos[droppableAreaIndex]]
        const removeItemIndex = copiedToDos.indexOf(removeingTask)
        copiedToDos.splice(removeItemIndex, 1)
        tasksFull.splice(droppableAreaIndex, 1, copiedToDos);
        setToDos(tasksFull)
    }
    const onDragEnd = (result) => {
        if (result.destination) {
            const source = result.source
            const destination = result.destination
            const sourceDroppableId = source.droppableId
            const destinationDroppableId = destination.droppableId
            
            const destDroppableAreaIndex = dropableIds.indexOf(destinationDroppableId)
            const sourceDroppableAreaIndex = dropableIds.indexOf(sourceDroppableId)
            const copiedSourceTasks = [...toDos[sourceDroppableAreaIndex]]
            const copiedDestTasks = [...toDos[destDroppableAreaIndex]]
            const [draggingItem] = copiedSourceTasks.splice(source.index, 1)

            if (sourceDroppableAreaIndex === destDroppableAreaIndex) {
                copiedSourceTasks.splice(destination.index, 0, draggingItem)
                tasksFull[sourceDroppableAreaIndex] = copiedSourceTasks
            }
            else {
                copiedDestTasks.splice(destination.index, 0, draggingItem)
                tasksFull[sourceDroppableAreaIndex] = copiedSourceTasks
                tasksFull[destDroppableAreaIndex] = copiedDestTasks
            }
            setToDos(tasksFull)
        }
    }

    return (
        <div className='container-fluid'>
            <div className='col' style={{ paddingTop: '20px' }}>
                <div className='row'>
                    <DragDropContext
                        // onBeforeCapture={this.onBeforeCapture}
                        // onBeforeDragStart={this.onBeforeDragStart}
                        // onDragStart={this.onDragStart}
                        // onDragUpdate={this.onDragUpdate}
                        onDragEnd={(result) => onDragEnd(result)}
                    >
                        <div className='col-lg-4 col-md-4 col-sm-12 shadow-sm pt-3'>
                            <h4 className='bg-info p-3 text-light'>Tasks To Do</h4>
                            <small >Please add your planned tasks</small>
                            <div className='shadow-sm rounded p-3 ' style={{ display: 'flex' }}>
                                <div className="input-group mb-3">
                                    <input type="text" name="task" value={toDo} className="form-control" onChange={(e) => setToDo(e.target.value.toUpperCase())} placeholder='Enter Task' aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                    
                                    <div className="input-group-append">
                                        <button className="btn  bg-none" type="button" onClick={() => CreateTaskList(toDo)
                                        }><FaPlus color='green' /></button>
                                    </div>
                                    
                                </div>
                            </div>
                            
                            <Droppable droppableId="droppableTasksToDo" >
                                {
                                    (provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            style={{ minHeight: '200px' }}
                                        >
                                            {
                                                toDos[0].map((item, index) => {
                                                    return (
                                                        <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                                                            {
                                                                (provided, snapshot) => {
                                                                    return (
                                                                        <div ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            key={item.id} className='p-2 shadow-sm rounded bg-info text-light'
                                                                            style={{ ...provided.draggableProps.style, textAlign: 'left', background: 'yellow', marginTop: '5px' }}
                                                                        >
                                                                            <b><FaChevronRight className="text-danger" style={{ marginRight: '5px' }} />{item.toDo}</b>
                                                                            <button className='btn btn-sm bg-none' style={{ float: 'right', marginTop: '-5px', marginRight: '5px' }}
                                                                                onClick={() => RemoveTask(item.id,'droppableTasksToDo')}>
                                                                                <FaTimes color='red' />
                                                                            </button>
                                                                        </div>
                                                                    )
                                                                }
                                                            }
                                                        </Draggable>
                                                    )
                                                })
                                            }

                                            {provided.placeholder}
                                        </div>
                                    )
                                }
                            </Droppable>
                        </div>
                        <div className='col-lg-4 col-md-4 col-sm-12 shadow-sm pt-3'>
                            <h4 className='bg-warning p-3 text-light'>Tasks In Progress</h4>

                            <Droppable droppableId="droppableTasksInProgress" >
                                {
                                    (provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className='p-2'
                                            style={{ minHeight: '200px' }}
                                        >
                                            {
                                                toDos[1].map((item, index) => {
                                                    return (
                                                        <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                                                            {
                                                                (provided, snapshot) => {
                                                                    return (
                                                                        <div ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            key={item.id} className='p-2 shadow-sm rounded bg-warning text-light'
                                                                            style={{ ...provided.draggableProps.style, textAlign: 'left', background: 'orange', marginTop: '5px' }}
                                                                        >
                                                                            <b><FaChevronRight className="text-info" style={{ marginRight: '5px' }} />{item.toDo}</b>
                                                                            <button className='btn btn-sm bg-none' style={{ float: 'right', marginTop: '-5px', marginRight: '5px' }}
                                                                                onClick={() => RemoveTask(item.id,'droppableTasksInProgress')}>
                                                                                <FaTimes color='red' />
                                                                            </button>
                                                                        </div>
                                                                    )
                                                                }
                                                            }
                                                        </Draggable>
                                                    )
                                                })
                                            }

                                            {provided.placeholder}
                                        </div>
                                    )
                                }
                            </Droppable>
                        </div>
                        <div className='col-lg-4 col-md-4 col-sm-12 shadow-sm pt-3'>
                            <h4 className='bg-success p-3 text-light'>Completed Tasks</h4>
                            <Droppable droppableId="droppableTasksCompleted" >
                                {
                                    (provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className='p-2'
                                            style={{ minHeight: '200px' }}
                                        >
                                            {
                                                toDos[2].map((item, index) => {
                                                    return (
                                                        <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                                                            {
                                                                (provided, snapshot) => {
                                                                    return (
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            key={item.id} className='p-2 shadow-sm rounded bg-success text-light'
                                                                            style={{ ...provided.draggableProps.style, textAlign: 'left', marginTop: '5px' }}
                                                                        >
                                                                            <b><FaChevronRight className="text-info" style={{ marginRight: '5px' }} />{item.toDo}</b>
                                                                            <button className='btn btn-sm bg-none' style={{ float: 'right', marginTop: '-5px', marginRight: '5px' }}
                                                                                onClick={() => RemoveTask(item.id,'droppableTasksCompleted')}>
                                                                                <FaTimes color='red' />
                                                                            </button>
                                                                        </div>
                                                                    )
                                                                }
                                                            }
                                                        </Draggable>
                                                    )
                                                })
                                            }

                                            {provided.placeholder}
                                        </div>
                                    )
                                }


                            </Droppable>

                        </div>
                    </DragDropContext>
                </div>
            </div>

        </div>
    );
};

export default ToDo;