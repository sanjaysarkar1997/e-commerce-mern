import instance from "@/apis/apis";

// http post services
export const postServices = async (url, data) => {
  try {
    const res = await instance.post(url, data);
    if (res.data.error) {
      return { ok: false, data: res.data.results, message: res.data.message };
    } else {
      return { ok: true, data: res.data.results, message: res.data.message };
    }
  } catch (error) {
    return { ok: false, data: [], message: error };
  }
};

// http get services
export const getServices = async (url) => {
  try {
    const res = await instance.get(url);
    if (res.data.error) {
      return { ok: false, data: res.data.results, message: res.data.error };
    } else {
      return { ok: true, data: res.data.results, message: res.data.message };
    }
  } catch (error) {
    return { ok: false, data: [], message: error };
  }
};

// http post services with token
export const postServicesWithToken = async (url, data) => {
  try {
    const res = await instance.post(url, data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("vue-node-token"),
      },
    });

    if (res.data.error) {
      return { ok: false, data: [], message: res.data.error };
    } else {
      return { ok: true, data: res.data.result, message: res.data.message };
    }
  } catch (error) {
    return { ok: false, data: [], message: error };
  }
};

// http get services with token
export const getServicesWithToken = async (url) => {
  try {
    const res = await instance.get(url, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("vue-node-token"),
      },
    });

    if (res.data.error) {
      return { ok: false, data: [], message: res.data.error };
    } else {
      return { ok: true, data: res.data.results, message: res.data.message };
    }
  } catch (error) {
    return { ok: false, data: [], message: error };
  }
};
