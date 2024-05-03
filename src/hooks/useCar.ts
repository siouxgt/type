import { useState, useEffect, useMemo } from "react"
import { db } from "../data/db"
import { Guitar, carItem } from "../types"

export const useCar = () => {
    
    const initialCar = () : carItem[] => {
        const localStorageCar = localStorage.getItem('car')
        return localStorageCar ? JSON.parse(localStorageCar) : []
    }
  
// State
const [data] = useState (db)
const [car, setCart] = useState(initialCar)

const   MAX_ITEMS = 5
const MIN_ITEMS = 1

useEffect (() => {
    localStorage.setItem('car', JSON.stringify(car))
}, [car])

function addToCart (item : Guitar) {
    const itemExists = car.findIndex(guitar => guitar.id === item.id)
    if(itemExists >= 0) {// existe en el carrito
        if(car[itemExists].quantity >= MAX_ITEMS) return
        const updateCar = [...car]
        updateCar[itemExists].quantity++
        setCart(updateCar)
    } else {
        const newItem : carItem = { ...item, quantity : 1}
        setCart([...car, newItem])
    }

  
}

function removeFromCar(id : Guitar['id']) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
}

function decreseQuantity (id : Guitar['id']){
    const updateCar = car.map (item => {
        if(item.id === id && item.quantity > MIN_ITEMS) {
            return {
                ...item,
                quantity: item.quantity - 1
            }
        }
        return item
    })
    setCart(updateCar)
}

function incrementQuantity(id : Guitar['id']) {
    const updateCar = car.map (item => {
     if(item.id === id && item.quantity < MAX_ITEMS) {
         return{
             ...item,
             quantity: item.quantity + 1
         }
     }
     return item
 })
 setCart(updateCar)
 }
 
 function clearCar () {
     setCart([])
 }
 const isEmpty = useMemo (() => car.length === 0, [car])
 const carTotal = useMemo ( () => car.reduce((total, item ) => total + (item.quantity * item.price), 0), [car])

    return {
        data,
        car,
        addToCart,
        removeFromCar,
        decreseQuantity,
        incrementQuantity,
        clearCar,
        isEmpty,
        carTotal

    }
}