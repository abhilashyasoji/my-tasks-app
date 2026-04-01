//write your code here
import './index.css'

const TagItem = props => {
  const {tagDetails, onClickTag, isActive} = props
  const {optionId, displayText} = tagDetails

  const onClickButton = () => {
    onClickTag(optionId)
  }

  const activeClass = isActive ? 'active-tag' : ''
  return (
    <li className="tag-item">
      <button
        type="button"
        className={`tag-button ${activeClass}`}
        onClick={onClickButton}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TagItem
