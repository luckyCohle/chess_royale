type AuthResponse = {
  success: boolean;
  data?: any;
  error?: string;
};

export const login = async (form: { email: string; password: string }): Promise<AuthResponse> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HTTP_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: data?.message || "Login failed",
      };
    }

    localStorage.setItem("token", data.token);

    return {
      success: true,
      data,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Network error",
    };
  }
};


export const signup = async (form: { email: string; username: string; password: string,profile_img?:string }): Promise<AuthResponse> => {
  try {
    const formData = { ...form, rating: 400 };

    const res = await fetch(`${process.env.NEXT_PUBLIC_HTTP_URL}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: data?.message || "Signup failed",
      };
    }

    localStorage.setItem("token", data.token);

    return {
      success: true,
      data,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Network error",
    };
  }
};