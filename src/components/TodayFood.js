import trashIcon from './../img/trash-512.webp'

function TodayFood(props) {
    const { removeItem, food, index } = props


    return (
        <div>
            <li>{food.quantity} {food.name} = {food.calories} cal <img onClick={() => removeItem(index)} className='trashIcon' src={trashIcon} alt='trash' /></li>
        </div>
    )
}

export default TodayFood


