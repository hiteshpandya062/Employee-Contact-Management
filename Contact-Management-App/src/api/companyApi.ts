
import { CompanyViewModel } from "../types";
import axios from "./axiosInstance";

export const fetchCompanies = () => axios.get<CompanyViewModel[]>('/companies');