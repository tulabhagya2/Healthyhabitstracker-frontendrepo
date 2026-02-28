const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://healthy-habits-tracker-backend-repo.onrender.com";

/* =========================================
   TOKEN + HEADERS
========================================= */

const getAuthToken = () => localStorage.getItem("token");

const getHeaders = () => {
  const token = getAuthToken();

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

/* =========================================
   AUTH API
========================================= */

export const authAPI = {
  signup: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    return handleResponse(response);
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await handleResponse(response);

    if (data.token) {
      localStorage.setItem("token", data.token);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
    }

    return data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (err) {
      localStorage.removeItem("user");
      return null;
    }
  },
};

/* =========================================
   HABIT API
========================================= */

export const habitAPI = {
  add: async (habitData) => {
    const response = await fetch(`${API_BASE_URL}/habits/add`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(habitData),
    });

    return handleResponse(response);
  },

  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/habits`, {
      headers: getHeaders(),
    });

    return handleResponse(response);
  },

  complete: async (habitId) => {
    const response = await fetch(
      `${API_BASE_URL}/habits/${habitId}/complete`,
      {
        method: "PUT",
        headers: getHeaders(),
      }
    );

    return handleResponse(response);
  },

  getSummary: async () => {
    const response = await fetch(`${API_BASE_URL}/habits/summary`, {
      headers: getHeaders(),
    });

    return handleResponse(response);
  },
};

/* =========================================
   GOAL API
========================================= */

export const goalAPI = {
  add: async (goalData) => {
    const response = await fetch(`${API_BASE_URL}/goals/add`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(goalData),
    });

    return handleResponse(response);
  },

  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/goals`, {
      headers: getHeaders(),
    });

    return handleResponse(response);
  },

  updateProgress: async (goalId, progressData) => {
    const response = await fetch(
      `${API_BASE_URL}/goals/${goalId}/progress`,
      {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(progressData),
      }
    );

    return handleResponse(response);
  },
};

/* =========================================
   DASHBOARD API
========================================= */

export const dashboardAPI = {
  get: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard`, {
      headers: getHeaders(),
    });

    return handleResponse(response);
  },
};

/* =========================================
   ANALYTICS API
========================================= */

export const analyticsAPI = {
  get: async () => {
    const response = await fetch(`${API_BASE_URL}/analytics`, {
      headers: getHeaders(),
    });

    return handleResponse(response);
  },
};

/* =========================================
   ACTIVITY API
   (Matches Your Backend Exactly)
========================================= */

export const activityAPI = {
  add: async (activityData) => {
    const response = await fetch(`${API_BASE_URL}/activity/add`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(activityData),
    });

    return handleResponse(response);
  },

  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/activity`, {
      headers: getHeaders(),
    });

    return handleResponse(response);
  },

  update: async (activityId, activityData) => {
    const response = await fetch(
      `${API_BASE_URL}/activity/update/${activityId}`,
      {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(activityData),
      }
    );

    return handleResponse(response);
  },

  delete: async (activityId) => {
    const response = await fetch(
      `${API_BASE_URL}/activity/delete/${activityId}`,
      {
        method: "DELETE",
        headers: getHeaders(),
      }
    );

    return handleResponse(response);
  },
};