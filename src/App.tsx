import Guitar from "./components/Guitar"
import Headear from "./components/Headear"
import { useCar } from "./hooks/useCar"

function App() {

const {data, car, addToCart, removeFromCar, decreseQuantity, incrementQuantity, clearCar, isEmpty, carTotal} = useCar()

  return (
    <>
 
    <Headear
    
    car={car}
    removeFromCar={removeFromCar}
    incrementQuantity={incrementQuantity}
    decreseQuantity={decreseQuantity}
    clearCar={clearCar}
    isEmpty={isEmpty}
    carTotal={carTotal}

    />

   <main className="container-xl mt-5">
    
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
           {data.map((guitar) => (
           <Guitar 
                    key={guitar.id}
                    guitar={guitar}
                    addToCart={addToCart}
           />

                
           ))}       
        </div>

    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer> 
    </>
  )
}

export default App
