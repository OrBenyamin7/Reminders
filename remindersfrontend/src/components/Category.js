import { useAuthContext } from '../hooks/useAuthContext'
import { useTasksContext } from '../hooks/useTasksContext'

const Category = () => {
    const {user } = useAuthContext()
    const { dispatch} = useTasksContext()

    //console.log('herehfdghfhg')

    const chooseAll = async () => {
        const userId = user.userId
        const response = await fetch('/api/tasks/' + userId, {
            headers: {'Authorization': `Bearer ${user.token}`},
        })
        const json = await response.json()
        dispatch({ type: 'SET_TASKS' , payload: json})
    }

    const chooseCreateDate = async () => {
        const userId = user.userId
        const response = await fetch('/api/tasks/' + userId, {
            headers: {'Authorization': `Bearer ${user.token}`},
        })
        const json = await response.json()
        dispatch({type: 'SORT_BY_CREATE_DATE', payload: json})
    }



    const chooseDueDate = async () => {
        const userId = user.userId
        const response = await fetch('/api/tasks/' + userId, {
            headers: {'Authorization': `Bearer ${user.token}`},
        })
        const json = await response.json()
        dispatch({ type: 'SORT_BY_DUE_DATE' , payload: json})
    }



    const choosePriority = async () => {
        const userId = user.userId
        const response = await fetch('/api/tasks/' + userId, {
            headers: {'Authorization': `Bearer ${user.token}`},
        })
        const json = await response.json()
        dispatch({ type: 'SORT_BY_PRIORITY' , payload: json})
    }

    return (
        <header>
            {user && (
                <div className="containerCategory">
                    <button className="headLineCategory" onClick={chooseAll}>All</button>
                    <button className="headLineCategory" onClick={chooseCreateDate}>Create Date</button>
                    <button className="headLineCategory" onClick={chooseDueDate}>Due Date</button>
                    <button className="headLineCategory" onClick={choosePriority}>Priority</button>
                </div>
            )}
        </header>
    )
}

export default Category
