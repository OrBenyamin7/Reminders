import { useEffect } from 'react';
import { useTasksContext } from '../hooks/useTasksContext';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuthContext } from "../hooks/useAuthContext"

// Components
import TaskDetails from '../components/TaskDetails';
import TaskForm from '../components/TaskForm';

const Home = ({ theme }) => {
  const { tasks, dispatch } = useTasksContext();
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('/api/tasks', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_TASKS', payload: json})
      }
    }

    if (user) {
      fetchTasks()
    }
  }, [dispatch, user])


  return (
    <Container>
      <Row>
        <Col md={8}>
          <div className="tasks">
            {tasks &&
              tasks.map((task) => (
                <TaskDetails key={task._id} task={task} theme={theme} />
              ))}
          </div>
        </Col>
        <Col md={4}>
          <TaskForm theme={theme} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
