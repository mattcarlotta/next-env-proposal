import MockAdapter from "axios-mock-adapter";
import app from "../axiosConfig";

const mockAxios = new MockAdapter(app);

export default mockAxios;
