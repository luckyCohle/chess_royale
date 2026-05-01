export const getUserData = async() => {
    const token = localStorage.getItem("token");
    console.log("fetching user data");
    const res = await fetch(`${process.env.NEXT_PUBLIC_HTTP_URL}/users/userData`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json()
    // console.log(data)
    return data;
}