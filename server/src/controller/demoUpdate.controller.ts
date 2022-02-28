import { Person } from "../model/demo.model";
import { error, success } from "../services/responseModifier";

// Normal Find All Data Get
const getPersons = async (req: any, res: any, next: any) => {
  try {
    let persons = await Person.find();
    if (!persons) {
      res.json(error("Fetch Failed", 300));
    } else {
      res.json(success("Fetched Successful", { persons }, 200));
    }
  } catch (error) {
    console.log(error);
  }
};

// Normal Find One Data Get
const getPerson = async (req: any, res: any, next: any) => {
  try {
    let id = req?.params?.id;
    let movie = await Person.findById(id).populate("cinemas");
    if (!movie) {
      res.json(error("Fetch Failed", 300));
    } else {
      res.json(success("Fetched Successful", { movie }, 200));
    }
  } catch (error) {}
};

// Normal Find All Data Get with Pagination
const getPersonsWithPagination = async (req: any, res: any, next: any) => {
  try {
    let page = req?.query?.page;
    let limit = req?.query?.limit;
    let persons = await Person.find().skip(page).limit(limit);
    if (!persons) {
      res.json(error("Fetch Failed", 300));
    } else {
      res.json(success("Fetched Successful", { persons }, 200));
    }
  } catch (error) {
    console.log(error);
  }
};

// Normal Find All Data Get with Data filter
const getPersonsWithFilter = async (req: any, res: any, next: any) => {
  try {
    let name = req?.query?.name;
    let persons = await Person.find({ name: { $regex: name, $options: "i" } });
    if (!persons) {
      res.json(error("Fetch Failed", 300));
    } else {
      res.json(success("Fetched Successful", { persons }, 200));
    }
  } catch (error) {
    console.log(error);
  }
};

// Normal Find All Data with Aggregation
const getPersonsWithAggregation = async (req: any, res: any, next: any) => {
  try {
    let persons = await Person.aggregate([
      {
        $group: {
          _id: "$name",
          count: { $sum: 1 },
        },
      },
    ]);
    if (!persons) {
      res.json(error("Fetch Failed", 300));
    } else {
      res.json(success("Fetched Successful", { persons }, 200));
    }
  } catch (error) {
    console.log(error);
  }
};

// Normal Create Data
const createPerson = async (req: any, res: any, next: any) => {
  try {
    let person = new Person(req.body);
    let result = await person.save();
    if (!result) {
      res.json(error("Create Failed", 300));
    } else {
      res.json(success("Created Successful", { result }, 200));
    }
  } catch (error) {
    console.log(error);
  }
};

// Update Data
const updatePerson = async (req: any, res: any, next: any) => {
  try {
    let id = req?.params?.id;
    let person = await Person.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!person) {
      res.json(error("Update Failed", 300));
    } else {
      res.json(success("Updated Successful", { person }, 200));
    }
  } catch (error) {
    console.log(error);
  }
};

// Delete Data
const deletePerson = async (req: any, res: any, next: any) => {
  try {
    let id = req?.params?.id;
    let result = await Person.findByIdAndDelete(id);
    if (!result) {
      res.json(error("Delete Failed", 300));
    } else {
      res.json(success("Deleted Successful", { result }, 200));
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  getPersons,
  getPerson,
  getPersonsWithPagination,
  getPersonsWithFilter,
  getPersonsWithAggregation,
  createPerson,
  updatePerson,
  deletePerson,
};
