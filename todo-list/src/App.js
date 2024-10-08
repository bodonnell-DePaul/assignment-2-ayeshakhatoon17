import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, Form, Button } from 'react-bootstrap';
import todoItems from './todoItems'; // Importing static data

function App() {
  // Initialize state with the static data
  const [items, setItems] = useState(
    todoItems.map((item, index) => ({
      ...item,
      colorIndex: index % 5, // Pre-assign color indexes for initial items
    }))
  );
  const [selectedIndex, setSelectedIndex] = useState(0); // Track which item is selected
  const [newTitle, setNewTitle] = useState(''); // State for new ToDo title
  const [newDueDate, setNewDueDate] = useState(''); // State for new ToDo due date
  const [newDescription, setNewDescription] = useState(''); // State for new ToDo description

  // Predefined color array (for example, 5 colors)
  const colors = ['#FFCDD2', '#F8BBD0', '#E1BEE7', '#BBDEFB', '#C8E6C9'];

  // Function to handle due date changes
  const handleDueDateChange = (e) => {
    const updatedItems = [...items];
    updatedItems[selectedIndex].dueDate = e.target.value;
    setItems(updatedItems);
  };

  // Function to delete a ToDo item
  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    setSelectedIndex(0); // Reset selection after delete
  };

  // Function to add a new ToDo item
  const handleAddItem = (e) => {
    e.preventDefault();
    if (newTitle.trim() && newDueDate && newDescription.trim()) {
      const newItem = {
        title: newTitle,
        description: newDescription, // User-provided description
        dueDate: newDueDate,
        colorIndex: items.length % colors.length, // Assign the next color index
      };

      setItems([...items, newItem]);
      setNewTitle(''); // Clear the title input field after adding
      setNewDueDate(''); // Clear the due date input field after adding
      setNewDescription(''); // Clear the description field after adding
    } else {
      alert('Please fill in the title, description, and due date.');
    }
  };

  return (
    <Container fluid style={{ backgroundColor: '#ffebee', minHeight: '100vh', padding: '20px' }}>
      <header className="my-4 text-center">
        <h1>AYESHA'S</h1>
      </header>

      <Row>
        {/* Column for ToDo List */}
        <Col sm={4}>
          <h4>Your todo list</h4>
          <ListGroup>
            {items.map((item, index) => (
              <ListGroup.Item
                key={index}
                action
                href={`#item${index}`}
                onClick={() => setSelectedIndex(index)} // Set the clicked item as selected
                className="d-flex justify-content-between align-items-center"
                style={{ backgroundColor: colors[item.colorIndex] }} // Use the assigned color
              >
                <span>{item.title}</span>
                <Button
                  style={{ backgroundColor: '#d32f2f', borderColor: '#ff8a80' }} // Custom color for delete button
                  size="sm"
                  onClick={() => handleDeleteItem(index)}
                >
                  Delete
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* Column for Description */}
        <Col sm={4}>
          <h4>Description</h4>
          {items[selectedIndex] && (
            <div>
              <p>{items[selectedIndex].description}</p>
              <p>
                Due Date
                <input
                  type="date"
                  className="form-control d-inline-block w-50"
                  value={items[selectedIndex].dueDate}
                  onChange={handleDueDateChange}
                />
              </p>
            </div>
          )}
        </Col>
      </Row>

      {/* Add New Item Form */}
      <Row className="mt-4">
        <Col sm={4}>
          <h4>Add New ToDo</h4>
          <Form onSubmit={handleAddItem}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={newTitle} // Bind input value to newTitle state
                onChange={(e) => setNewTitle(e.target.value)} // Update state on input change
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter description"
                value={newDescription} // Bind input value to newDescription state
                onChange={(e) => setNewDescription(e.target.value)} // Update state on input change
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={newDueDate} // Bind input value to newDueDate state
                onChange={(e) => setNewDueDate(e.target.value)} // Update state on date change
              />
            </Form.Group>
            <Button 
              type="submit" 
              className="mt-3"
              style={{ backgroundColor: '#4a148c', borderColor: '#4a148c' }}
            >
              Add Item
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
