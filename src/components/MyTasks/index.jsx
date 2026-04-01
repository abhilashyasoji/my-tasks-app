//write your code here

import { useState } from 'react'

import TagItem from '../TagItem/index.jsx'
import TaskItem from '../TaskItem/index.jsx'

import {v4 as uuidv4} from 'uuid'

import './index.css'

const tagsList = [
  {optionId: 'HEALTH', displayText: 'Health'},
  {optionId: 'EDUCATION', displayText: 'Education'},
  {optionId: 'ENTERTAINMENT', displayText: 'Entertainment'},
  {optionId: 'SPORTS', displayText: 'Sports'},
  {optionId: 'TRAVEL', displayText: 'Travel'},
  {optionId: 'OTHERS', displayText: 'Others'},
]

/*const tasksList = [
  {id: 1, task: 'Go to gym', tag: 'HEALTH'},
  {id: 2, task: 'Prepare for exam', tag: 'EDUCATION'},
  {id: 3, task: 'Watch movie', tag: 'ENTERTAINMENT'},
  {id: 4, task: 'Play cricket', tag: 'SPORTS'},
  {id: 5, task: "Visit Granny's home", tag: 'TRAVEL'},
]*/

const MyTasks = () => {
  const [tasksList, setTasksList] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [selectedTag, setSelectedTag] = useState(tagsList[0].optionId)
  const [activeTag, setActiveTag] = useState('')

  //input change
  const onChangeInput = event => {
    setInputValue(event.target.value)
  }
  // console.log(inputValue)

  //selected tag change
  const onChangeSelectTag = event => {
    setSelectedTag(event.target.value)
  }

  //on Add task

  const onAddTask = event => {
    event.preventDefault()

    if (inputValue.trim() === '') return

    const newTask = {
      id: uuidv4(),
      task: inputValue,
      tag: selectedTag,
    }

    setTasksList(previousTask => [...previousTask, newTask])
    setInputValue('')
    setSelectedTag(tagsList[0].optionId)
  }

  //onclick tag
  const onClickTag = tagId => {
    if (activeTag === tagId) {
      setActiveTag('')
    } else {
      setActiveTag(tagId)
    }
  }

  //filtering
  const filteredTasks =
    activeTag === ''
      ? tasksList
      : tasksList.filter(each => each.tag === activeTag)

  return (
    <div className="app-container">
      {/*This is for left section*/}
      <div className="create-task-container">
        <h1 className="create-task-heading">Create a task!</h1>
        <form onSubmit={onAddTask}>
          <label className="create-task-label" htmlFor="createTaskId">
            Task
          </label>
          <input
            type="text"
            className="create-task-input"
            id="createTaskId"
            placeholder="Enter the task here"
            value={inputValue}
            onChange={onChangeInput}
          />

          <label className="create-task-label" htmlFor="selectId">
            Tags
          </label>
          <select
            id="selectId"
            className="create-task-input"
            value={selectedTag}
            onChange={onChangeSelectTag}
          >
            {tagsList.map(each => (
              <option key={each.optionId} value={each.optionId}>
                {each.displayText}
              </option>
            ))}
          </select>
          <button className="button" type="submit">
            Add Task
          </button>
        </form>
      </div>

      {/*This is right side section*/}
      <div className="tasks-container">
        <h1 className="create-task-heading">Tags</h1>
        <ul className="tags-list">
          {tagsList.map(each => (
            <TagItem
              key={each.optionId}
              tagDetails={each}
              onClickTag={onClickTag}
              isActive={activeTag === each.optionId}
            />
          ))}
        </ul>
        <h1 className="create-task-heading">Tasks</h1>
        {filteredTasks.length === 0 ? (
          <p>No Tasks Added Yet</p>
        ) : (
          <ul className="tasks-list">
            {filteredTasks.map(each => (
              <TaskItem key={each.id} taskDetails={each} />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default MyTasks
