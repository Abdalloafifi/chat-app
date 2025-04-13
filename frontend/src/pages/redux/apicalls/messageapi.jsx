import { massActions } from "../slices/messageslice";
import server from "../../utils/request";
import { toast } from "react-toastify";

export function getAllUsers() {
  return async (dispatch) => {
    try {
      const res = await server.get("/messager/allusers");
      dispatch(massActions.getCline(res.data));
      dispatch(massActions.commchat(res.data));
      localStorage.setItem("commchat", JSON.stringify(res.data));
      localStorage.setItem("allClin", JSON.stringify(res.data));
    } catch (error) {
    }
  };
}
export function getUsers() {
  return async (dispatch) => {
    try {
      const res = await server.get("/messager/users");
      dispatch(massActions.getUsers(res.data));
      
    } catch (error) {
      massActions.getCline([])
    }
  };
}

export function getFriends(){
  return async (dispatch) => {
    try {
      const res = await server.get("/messager/friends");
      dispatch(massActions.getFriends(res.data.frinds));
      localStorage.setItem("getFriends", JSON.stringify(res.data.frinds));
      
      dispatch(massActions.commchat(res.data.frinds));
      localStorage.setItem("commchat", JSON.stringify(res.data.frinds));
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || "حدث خطأ أثناء تحميل المستخدمين");
    }
  };
}
export function addFriends(formData) {
  return async (dispatch) => {
    try {
      const res = await server.post("/messager/addFriends", formData);
      dispatch(massActions.addFriends(res.data));
      toast.success("تمت الطلب ");
    } catch (error) {
      toast.error(error.response?.data?.error || "حدث خطأ أثناء طلب الصدراقه");
    }
  };
}
export function getConfirmFriends() {
  return async (dispatch) => {
    try {
      const res = await server.get("/messager/confirmFriends");
      dispatch(massActions.getConfirmFriends(res.data));
    } catch (error) {
      toast.error(error.response?.data?.error || "حدث خطأ أثناء تحميل المستخدمين");
    }
  };
}
//confirm order
export function ConfirmOrder(friendId) {
  return async (dispatch) => {
    try {
      const res = await server.post("/messager/confirmOrder", {friendId});
      dispatch(massActions.ConfirmFriends(res.data));
      dispatch(getConfirmFriends()); // أضف هذا لتحديث القائمة

      toast.success("تمت الطلب ");
    } catch (error) {
      toast.error(error.response?.data?.error || "حدث خطأ أثناء طلب الصدراقه");
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
        console.error("Error sending message:", error);
      throw error;
    }
  };
}