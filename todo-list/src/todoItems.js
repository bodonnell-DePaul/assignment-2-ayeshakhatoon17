const todoItems = [
    {
      title: "Finish Assignment",
      description: "Complete the React Bootstrap ToDo List Assignment.",
      dueDate: new Date().toISOString().split("T")[0], 
    },
    {
      title: "Go Grocery Shopping",
      description: "Buy groceries for the week.",
      dueDate: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split("T")[0], 
    },
    {
      title: "Pay Rent",
      description: "Pay rent for the month.",
      dueDate: new Date(new Date().setDate(new Date().getDate() + 20)).toISOString().split("T")[0], 
    },
  ];
  
  export default todoItems;
  