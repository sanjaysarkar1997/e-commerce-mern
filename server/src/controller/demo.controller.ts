import { Person } from "../model/demo.model";
import { error, success } from "../services/responseModifier";

const getMovies = async (req: any, res: any, next: any) => {
  try {
    let movies = await Person.find();
    if (!movies) {
      res.json(error("Fetch Failed", 300));
    } else {
      res.json(success("Fetched Successful", { movies }, 200));
    }
  } catch (error) {
    console.log(error);
  }
};

const getMovie = async (req: any, res: any, next: any) => {
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

const createMovie = (req: any, res: any, next: any) => {
  let data = req.body;
  let movie = new Person(data);
  movie.save((err: any, result: any) => {
    if (err) {
      res.json(error("Failed", 300));
    } else {
      res.json(success("Creation Successful", { movie: result }, 201));
    }
  });
};

const updateMovie = async (req: any, res: any, next: any) => {};

const deleteMovie = async (req: any, res: any, next: any) => {
  try {
    var id = req?.params?.id;
    let deletedID = await Person.deleteData(id);
    if (!deletedID) {
      res.json(error("Fetch Failed", 300));
    } else {
      res.json(success("Fetched Successful", { deletedID }, 200));
    }
  } catch (error) {}
};

export { getMovies, createMovie, updateMovie, getMovie, deleteMovie };
