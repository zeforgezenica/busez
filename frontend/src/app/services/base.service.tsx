import axios, { AxiosResponse } from "axios";

export default class BaseService<T> {
  protected url = process.env.API_URL;
  protected path: string;

  constructor(path: string) {
    this.path = path;
  }

  protected handleError = (error: any) => {
    if (error.response) {
      console.error("Backend returned code", error.response.status);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("An unexpected error occurred:", error.message);
    }
    return Promise.reject("Something bad happened; please try again later.");
  };

  protected getItems = async (subPath = ""): Promise<T[]> => {
    try {
      const response: AxiosResponse<T[]> = await axios.get(
        this.url + this.path + subPath
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  };

  protected async getItemsById(ids: string[]): Promise<T[]> {
    try {
      const queryString = ids.map((id) => `id=${id}`).join("&");
      const response: AxiosResponse<T[]> = await axios.get(
        `${this.url}${this.path}?${queryString}`
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  protected getItemById = async (id: string): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await axios.get(
        `${this.url}${this.path}/${id}`
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  };

  protected postItem = async (data: T, subPath = ""): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await axios.post(
        `${this.url}${this.path}${subPath}`,
        data
      );

      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  };

  protected updateItem = async (id: number, data: T): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await axios.put(
        `${this.url}${this.path}/${id.toString()}`,
        data
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  };

  protected deleteItem = async (id: number): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await axios.delete(
        `${this.url}${this.path}/${id.toString()}`
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  };

  public get = this.getItems;
  public getById = this.getItemById;
  public getByIds = this.getItemsById;
  public post = this.postItem;
  public put = this.updateItem;
  public delete = this.deleteItem;
}
