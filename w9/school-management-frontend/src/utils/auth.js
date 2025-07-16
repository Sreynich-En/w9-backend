// Legacy functions for backward compatibility
export function isAuthenticated() {
    const token = localStorage.getItem("token");
    if (!token) return false;
    
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.exp > Date.now() / 1000;
    } catch {
        return false;
    }
}

export function setToken(token) {
    localStorage.setItem("token", token);
    import("../api").then(module => {
        module.default.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    });
}

export function logout() {
    localStorage.removeItem("token");
    import("../api").then(module => {
        delete module.default.defaults.headers.common['Authorization'];
    });
}