import createHttp from "./BaseService";

const http = createHttp(true);
//const noAuthHttp = createHttp() -> NO es necesario enviar cabecera Authorization

export const getCurrentUser = () => http.get("/users/me");

export const getUsers = () => http.get("/users").then((res) => res);

export const getDetail = (id) => http.get(`/users/${id}`).then((res) => res);

export const createUser = (body) =>
  http.post("/users", body).then((res) => res);

export const updateUser = (id, body) =>
  http.post(`/users/${id}`, body).then((res) => res);

export const deleteUser = (id) =>
  http.post(`/users/${id}/delete`).then((res) => res);
