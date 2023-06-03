import { useState } from "react"
import { useTasksContext } from '../hooks/useTasksContext'


const TaskForm = () => {
    const { dispatch} = useTasksContext()

    const [description, setDescription] = useState('')
    const [due_date, setDate] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    var gapi = window.gapi
    var CLIENT_ID = '572225403155-ev8smqcjlgqu14f3r7j17rt4dbncest0.apps.googleusercontent.com'
    var API_KEY = 'AIzaSyC-GO_0z2MFOujlzACn97hRuUTMK2gUHtY'
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    var SCOPES = "https://www.googleapis.com/auth/calendar.events"


    const handleSubmit = async (e) => {
        gapi.load('client:auth2', () => {
            console.log('loaded client')

            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            })

            gapi.client.load('calendar', 'v3', () => console.log('bam!'))

            gapi.auth2.getAuthInstance().signIn()
            .then(() => {

                var event = {
                    'summary': 'Google I/O 2015',
                    'location': '800 Howard St., San Francisco, CA 94103',
                    'description': 'A chance to hear more about Google\'s developer products.',
                    'start': {
                      'dateTime': '2015-05-28T09:00:00-07:00',
                      'timeZone': 'America/Los_Angeles'
                    },
                    'end': {
                      'dateTime': '2015-05-28T17:00:00-07:00',
                      'timeZone': 'America/Los_Angeles'
                    },
                    'recurrence': [
                      'RRULE:FREQ=DAILY;COUNT=2'
                    ],
                    'attendees': [
                      {'email': 'lpage@example.com'},
                      {'email': 'sbrin@example.com'}
                    ],
                    'reminders': {
                      'useDefault': false,
                      'overrides': [
                        {'method': 'email', 'minutes': 24 * 60},
                        {'method': 'popup', 'minutes': 10}
                      ]
                    }
                  }

                  var request = gapi.client.calendar.events.insert({
                    'calendarId': 'primary',
                    'resource': event,
                  })

                  request.execute(event => {
                    window.open(event.htmlLink)
                  })
            })
        })
        e.preventDefault()

        const task = {description, due_date}

        const response = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok) {
            setDescription('')
            setDate('')
            setError(null)
            setEmptyFields([])
            console.log('new task added')
            dispatch({type: 'CREATE_TASK', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Task</h3>

            <label>Task description</label>
            <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'error' : ''}
            />

            <label>Task dueDate</label>
            <input
                type="Date"
                onChange={(e) => setDate(e.target.value)}
                value={due_date}
            />

            <button>Add Task</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default TaskForm