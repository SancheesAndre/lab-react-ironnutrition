import { useState } from 'react'
import foodData from './../foods.json'
import FoodBox from './FoodBox'
import FoodForm from './FoodForm'
import Search from './Search'
import TodayFood from './TodayFood'

function Foods() {
    const [foods, setFoods] = useState(foodData)
    const [filtered, setFiltered] = useState(foodData)
    const [showForm, setShowForm] = useState(false)
    const [menu, setMenu] = useState([])

    const toogleForm = () => {
        setShowForm(!showForm)
    }

    const addFood = newFood => {
        const updatedFoods = [...foods, newFood]
        const updatedFilteredFoods = [...filtered, newFood]

        setFoods(updatedFoods)
        setFiltered(updatedFilteredFoods)
        toogleForm()
    }

    const filterFood = term => {
        const filteredFood = foods.filter(food => {
            return food.name.toLowerCase().includes(term.toLowerCase())
        })
        setFiltered(filteredFood)
    }

    const addToMenu = foodData => {
        const updatedMenu = [...menu]
        const found = menu.find(element => {
            return element.name === foodData.name
        })

        if (found) {
            found.quantity += foodData.quantity
            found.calories += foodData.calories
        } else {
            updatedMenu.push(foodData)
        }
        setMenu(updatedMenu)
    }

    const totalCalories = () => {
        return menu.reduce((acc, val) => {
            return acc + val.calories
        }, 0)
    }

    const removeItem = (index) => {
        const newMenu = [...menu]
        newMenu.splice(index, 1)
        
        setMenu(newMenu)
    }

    return (
        <div>
            <h1>IronNutrition</h1>
            <button onClick={toogleForm} className='button'>Add Food</button>
            {showForm && <FoodForm addFood={addFood} />}

            <Search filterFood={filterFood} />

            <div className='columns'>
                <div className='column'>
                    {
                        filtered.map(food => {
                            return <FoodBox food={food} addToMenu={addToMenu} />
                        })
                    }
                </div>
                <div className='column'>
                    <h2>Today's food</h2>
                    <ul>
                        {menu.map((food, index) => {
                            return <TodayFood food={food} key={index} index={index} removeItem={removeItem} />
                        })}
                    </ul>
                    <p><b>Total {totalCalories()} cal</b></p>
                    
                </div>
            </div>

        </div>
    )
}

export default Foods