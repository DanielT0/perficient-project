import { Model } from "mongoose";

export default class APIFeatures {
  private query: Object;
  constructor(query: Object) {
    this.query = query;
  }

  paginate = async function (model: Model<UserInterface>, query: Object) {
    const data = await model.paginate({}, query);
    return data;
  };
}
