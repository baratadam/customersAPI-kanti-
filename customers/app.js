import express from "express";

const PORT = 3000;
const app = express();

app.use(express.json());

let customers = [
  { id: 1, name: "Adam", email: "random" },
  { id: 2, name: "Bob", email: "bobemail" },
  { id: 3, name: "Cloe", email: "cloeemail" },
  { id: 4, name: "Diana", email: "diana" },
];

//GET
app.get("/customers", (req, res) => {
  res.status(200).json(customers);
});

app.get("/customers/:id", (req, res) => {
  const id = req.params.id;
  const customer = customers.find((c) => c.id == id);
  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }
  res.status(200).json(customer);
});

//POST
app.post("/customers", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }
  const id = customers.length ? customers[customers.length - 1].id + 1 : 1;
  const newCustomer = { id, name, email };
  customers.push(newCustomer);
  res.status(201).json(newCustomer);
});

//PUT
app.put("/customers/:id", (req, res) => {
  const id = req.params.id;
  const customer = customers.find((customer) => customer.id == id);
  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }
  const index = customers.indexOf(customer);
  customers = { ...customer, name, email };
  customers[index] = customer;
  res.status(200).json(customer);
});

//DELETE

app.delete("/customers/:id", (req, res) => {
  const id = req.params.id;
  const customer = customers.filter((customer) => customer.id == id);
  res.status(200).json((message = "Customer deleted"));
});

app.listen(PORT, () => {
  console.log(`Server runs on http://localhost:${PORT}`);
});

//PATCH

app.patch("/customers/:id", (req, res) => {
    const id = req.params.id;
    const customer = customers.find((customer) => customer.id == id);
    if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
    }
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: "Name or email is required" });
    }
    const index = customers.indexOf(customer);
    customers = {
    id: customer.id,
    name: name || customer.name,
    email: email || customer.email,
    };
    customers[index] = customer;
    res.status(200).json(customers[index]);
    }
);

