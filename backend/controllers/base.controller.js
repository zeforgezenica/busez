const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

class BaseController {
  constructor(filePath, schema) {
    this.filePath = filePath;
    this.schema = schema;

    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req, res) {
    try {
      const items = await this.readFromFile();
      res.status(200).send(items);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "An error occurred while trying to get the items" });
    }
  }

  async getById(req, res) {
    const id = req.params.id;
    try {
      const items = await this.readFromFile();
      const item = items.find((item) => item._id === id);
      if (!item) {
        return res.status(404).send({ message: "Item not found" });
      }
      res.send(item);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "An error occurred while trying to fetch the item" });
    }
  }

  async create(req, res) {
    const newItemData = { _id: this.generateUniqueId(), ...req.body };
    if (!this.validateDataAgainstSchema(newItemData)) {
      return res.status(400).send({ message: "Invalid data format" });
    }

    try {
      let items = await this.readFromFile();
      items.push(newItemData);
      await this.writeToFile(items);
      res.status(200).send(newItemData);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "An error occurred while trying to create the item" });
    }
  }

  async update(req, res) {
    const id = req.params.id;
    const newData = req.body;

    try {
      let items = await this.readFromFile();
      const index = items.findIndex((item) => item._id === id);
      if (index === -1) {
        return res.status(404).send({ message: "Item not found" });
      }
      items[index] = { ...items[index], ...newData };
      await this.writeToFile(items);
      res.status(200).send(items[index]);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "An error occurred while trying to update the item" });
    }
  }

  async delete(req, res) {
    const id = req.params.id;
    try {
      let items = await this.readFromFile();
      const index = items.findIndex((item) => item._id === id);
      if (index === -1) {
        return res.status(404).send({ message: "Item not found" });
      }
      items.splice(index, 1);
      await this.writeToFile(items);
      res.status(200).send({ message: "Item deleted successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "An error occurred while trying to delete the item" });
    }
  }

  async readFromFile() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, "utf8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  }

  async writeToFile(data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(
        this.filePath,
        JSON.stringify(data, null, 2),
        "utf8",
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  generateUniqueId() {
    return uuidv4();
  }

  validateDataAgainstSchema(data) {
    // You can implement your validation logic here using the provided schema
    // For simple validation, you can compare properties of the data object with the schema
    // For more advanced validation, you can use libraries like 'ajv'
    return true; // For demonstration purposes, returning true always
  }
}

module.exports = BaseController;
