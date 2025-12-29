//The address of this server connected to a network is
//URL http://localhost:3000
//THE IP of this device is 127.0.0.1:3000 which is port 300 within the device

const express = require("express");
const app = express();
const PORT = 8383;

let data = [{ name: "Temidayo" }];

// http://localhost:3000

app.use(express.json());

//Website endpoints are basically endpoints that sends back html code to the browser, or are endpoints that shows visuals when the user huts the endpoint on a browser

app.get("/dashboard", (request, response) => {
  response.send("This is the dashboard page");
  response.status(200);
});

app.get("/", (request, response) => {
  response.send("Hello World, This is my first Backend Server using Node.js");
  console.log(request.method);
  response.status(200);
});

//API endpoints are basically endpoints that sends back data to the browser, or are endpoints that shows data when the user huts the endpoint on a browser

app.get("/api/data", (request, response) => {
  response.send(data);
  response.status(200);
});

//CRUD
app.post("/api/data", (request, response) => {
  const newData = request.body;
  console.log(newData);
  // Add the new object to the array
  data.push(newData);
  return response
    .status(201)
    .json({ message: "Data added successfully", data });
});

app.delete("/api/data/:name", (request, response) => {
  const nameToDelete = request.params.name;
  data = data.filter((item) => item.name !== nameToDelete);
  return response
    .status(200)
    .json({
      message: `Data with name ${nameToDelete} deleted successfully`,
      data,
    });
});

// JSON parse error handler
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON" });
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running  at http://localhost:${PORT}`);
});
