export const checkIfLoggedIn = () => {
    return localStorage.getItem("username");
}

export const setUser = (res) => {
    localStorage.setItem("username",res.data.user.username);
    localStorage.setItem("email",res.data.user.email);
    localStorage.setItem("id",res.data.user.id);
    localStorage.setItem("last_route",res.data.user.last_route_id);
    localStorage.setItem("name",res.data.user.firstName);
    localStorage.setItem("token",res.data.token);
}
