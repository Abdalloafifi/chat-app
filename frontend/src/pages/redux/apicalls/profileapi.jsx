import { proActions } from "../slices/profileslice";
import server from "../../utils/request";
import { toast } from "react-toastify";
import { authActions } from "../slices/authSlice";

export function fetchUserProfile(userId) {
    return async (dispatch) => {
        try {
            const res = await server.get(`/user/profile/${userId}`);
            const data = res.data;
            dispatch(proActions.getprofile(data));
            // localStorage.setItem('profile', JSON.stringify(data));

        } catch (error) {
            toast.error(error.response.data.error);
        }
    };
}

//updateUserprofile
export function updateUserProfile({ id, user }) {
    return async (dispatch) => {
        try {
            const res = await server.put(`/user/profile/put/${id}`, user);
            const data = res.data;

            dispatch(proActions.updatauser(data));
            localStorage.setItem('profile', JSON.stringify(res.data));
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };
}

// Upload Profile Photo
export function uploadProfilePhoto({ id, formData }) {
    return async (dispatch) => {
        try {
            const res = await server.put(`/user/profile/avatar/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            const data = res.data;

            // تحديث حالة البروفايل والمستخدم
            dispatch(proActions.updateavatar(data));
            dispatch(authActions.setUserPhoto(data.avatar)); // تأكد من وجود هذا الإجراء

            // تحديث localStorage
            const updatedProfile = { ...JSON.parse(localStorage.getItem('profile')), avatar: data.avatar };
            localStorage.setItem('profile', JSON.stringify(updatedProfile));

            // إعادة جلب البيانات للتأكد من التحديث
            dispatch(fetchUserProfile(data._id)); // أو username حسب ما يعمل

            toast.success("Photo updated successfully");
        } catch (error) {
            toast.error(
                error.response ? error.response.data.error : "Photo upload failed"
            );
            console.log(error)
        }
    };
}
//update isuserok
export function updateIsUserOk() {
    return async (dispatch) => {
        try {
            const res = await server.put(`/user/profile/isok`);
            const data = res.data;
            dispatch(proActions.isokuser(data));
            dispatch(authActions.setIsOk(data.isok));
            localStorage.setItem('profile', JSON.stringify(res.data));
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };
}