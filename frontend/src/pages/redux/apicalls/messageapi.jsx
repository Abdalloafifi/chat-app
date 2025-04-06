import { massActions } from "../slices/messageslice";
import server from "../../utils/request";
import { toast } from "react-toastify";

export function getAllUsers() {
  return async (dispatch) => {
    try {
      const res = await server.get("/messager/allusers");
      dispatch(massActions.getCline(res.data));
      localStorage.setItem("allClin", JSON.stringify(res.data));
    } catch (error) {
      toast.error(error.response?.data?.error || "حدث خطأ أثناء تحميل المستخدمين");
    }
  };
}

export function getmessageschat(id) {
  return async (dispatch) => {
    try {
      const res = await server.get(`/messager/messages/${id}`);
      dispatch(massActions.getMessage(res.data));
    } catch (error) {
      toast.error(error.response?.data?.error || "حدث خطأ أثناء تحميل المحادثة");
    }
  };
}

export function sendMessage({ receiverId, formData }) {
    return async (dispatch) => {
      try {
        const res = await server.post(`/messager/sendmessage/${receiverId}`, formData);
        return res.data;
      } catch (error) {
      toast.error(error.response?.data?.error || "فشل الإرسال");
      throw error;
    }
  };
}