const todoItems = [
    {
      title: "Finish Assignment",
      description: "Complete the React Bootstrap ToDo List Assignment.",
      dueDate: new Date().toISOString().split("T")[0], // today's date
    },
    {
      title: "Go Grocery Shopping",
      description: "Buy groceries for the week.",
      dueDate: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split("T")[0], // 5 days from now
    },
    {
      title: "Pay Rent",
      description: "Pay rent for the month.",
      dueDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split("T")[0], // 2 days from now
    },
  ];
  
  export default todoItems;
  