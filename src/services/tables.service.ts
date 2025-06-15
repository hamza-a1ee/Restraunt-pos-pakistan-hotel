import axiosInstance from "@/axios/axios.config";

export async function getAllTables(limit: number, page: number) {
  const response = await axiosInstance.get(`/api/table/get-all`, {
    params: {
      limit,
      page,
    },
  });
  return response.data;
}

export async function addTable(name: string) {
  const response = await axiosInstance.post(`/api/table/add`, {
    name,
  });
  return response.data;
}

export async function deleteTable(id: number) {
  const response = await axiosInstance.delete(`/api/table/delete/${id}`);
  return response.data;
}

export async function editTable(id: number, name: string) {
  const response = await axiosInstance.put(`/api/table/update/${id}`, {
    name,
  });
  return response.data;
}
