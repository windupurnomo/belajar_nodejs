const route = {
  getFruit: (req, res) => {
    const fruits = [
      { name: "Apel", color: "Red" },
      { name: "Mango", color: "Green" },
      { name: "Banana", color: "Yellow" }
    ];
    res.json(fruits);
  },

  getRoot: (req, res) => {
    res.json({ pesan: "Hello World", date: new Date() });
  }
};

export default route;
