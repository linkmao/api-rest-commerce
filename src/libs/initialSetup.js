import Role from '../models/Role'

export const createRoles = async  ()=>{
const count = await Role.estimatedDocumentCount()   // cuenta cuantos documentos hay en la colleccion Role

if (count>0)
return


// Si bien son tres roles que se guardan si no existem se pueden hacer de forma separada cada uno con su await, sin embargo
// esta funcion Promise.all permite hacerlos todos a la vez
const values = await  Promise.all(
    [
        new Role ({name:'admin'}).save(),
        new Role ({name:'user'}).save(),
        new Role ({name:'moderator'}).save(),
    ]
)

console.log(values)

}