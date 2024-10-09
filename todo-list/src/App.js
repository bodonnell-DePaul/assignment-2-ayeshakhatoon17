import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, Form, Button, Tab } from 'react-bootstrap';
import todoItems from './todoItems'; // Static array of ToDo items
import './App.css'; // Import the CSS file

function App() {
  // State for ToDo items
  const [items, setItems] = useState(todoItems);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  
  // Function to determine Bootstrap color variant based on due date
  const getVariant = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    
    // Reset time component to midnight for accurate day comparison
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

    if (diffDays > 7) return 'primary'; // More than 7 days away
    if (diffDays <= 7 && diffDays > 4) return 'success'; // Between 4 and 7 days away
    if (diffDays <= 4 && diffDays > 2) return 'warning'; // Between 2 and 4 days away
    return 'danger'; // Less than 2 days away
  };

  // Function to handle adding a new ToDo item
  const handleAddItem = (e) => {
    e.preventDefault();
    if (newTitle && newDescription && newDueDate) {
      const newItem = {
        title: newTitle,
        description: newDescription,
        dueDate: newDueDate,
      };
      setItems([...items, newItem]);
      setNewTitle('');
      setNewDescription('');
      setNewDueDate('');
    }
  };

  return (
    <Container fluid className="app-container">
      {/* Header Section */}
      <header className="app-header">
        <h2>Assignment 2 - AYESHA'S ToDo List</h2>
      </header>

      <Tab.Container id="todo-tabs" defaultActiveKey="#item0">
        <Row>
          {/* ToDo List Group */}
          <Col sm={4}>
            <h4>Your todo list</h4>
            <ListGroup>
              {items.map((item, index) => (
                <ListGroup.Item
                  key={index}
                  action
                  href={`#item${index}`}
                  className={`d-flex justify-content-between align-items-center ${getVariant(item.dueDate)}`}
                >
                  <span>{item.title}</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

          {/* Tab Content for Description and Due Date */}
          <Col sm={4}>
            <Tab.Content>
              {items.map((item, index) => (
                <Tab.Pane key={index} eventKey={`#item${index}`}>
                  <h5>Description:</h5>
                  <p contentEditable="true" className="description-content">{item.description}</p> {/* Editable description */}
                  <p>
                    Due Date:
                    <input
                      type="date"
                      className="form-control date-input"
                      value={item.dueDate}
                      onChange={(e) => {
                        const updatedItems = [...items];
                        updatedItems[index].dueDate = e.target.value;
                        setItems(updatedItems);
                      }}
                    />
                  </p>
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      {/* Add New Item Form */}
      <Row className="mt-4">
        <Col sm={3}>
          <h4>Add New ToDo</h4>
          <Form onSubmit={handleAddItem}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="input-field"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="input-field"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                className="input-field"
              />
            </Form.Group>
            <Button type="submit" className="add-item-btn">
              Add Item
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
