import { authActions } from "../slices/authSlice";
import server from "../../utils/request";
import { toast } from "react-toastify";

export function loginUser(userData) {
    return async (dispatch) => {
        try {console.log(userData);
            const res = await server.post('/auth/login', userData);
            // or
            // const res = await axios.post('http://localhost:3000/api/auth/login', user);

            // تمرير بيانات المستخدم الموجودة في res.data داخل خاصية user
            dispatch(authActions.login( res.data ));
            localStorage.setItem('user', JSON.stringify(res.data));

        } catch (error) {
            toast.error(error.response.data.error);
        }
    };
}
export function registerUser(userData) {
    return async (dispatch) => {
        try {
            const res = await server.post('/auth/register', userData);
            dispatch(authActions.register(res.data));
            localStorage.setItem('user', JSON.stringify(res.data));
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };
}
export function viledLogin() {
    return async (dispatch) => {
        try {
            const res = await server.get('/auth/viledLogin');
            dispatch(authActions.validate(res.data));
            localStorage.setItem('user', JSON.stringify(res.data));
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };
}
export function logoutUser() {
    return async (dispatch) => {
        try {
            await server.post('/auth/logout');
            dispatch(authActions.logout());
            localStorage.removeItem('user');
            //delete cookies
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };
}

export function deleteUser() {
    return async (dispatch) => {
        try {
            await server.post('/auth/deleteUser');
            dispatch(authActions.deleteUser());
            localStorage.removeItem('user');
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };
}