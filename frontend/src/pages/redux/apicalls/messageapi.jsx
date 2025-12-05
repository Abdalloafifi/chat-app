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

export function getFriends() {
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
      const res = await server.post("/messager/confirmOrder", { friendId });
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
      // Update UI immediately with the sent message
      dispatch(massActions.addNewMessage(res.data));
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.error || "فشل الإرسال");
      console.error("Error sending message:", error);
      throw error;
    }
  };
}

export function likeMessage(id) {
  return async (dispatch) => {
    try {
      const res = await server.put(`/messager/like/${id}`);
      // Dispatch is handled via socket, but we can update optimistically if needed
      dispatch(massActions.updateMessageLike({ messageId: id, likes: res.data.likes }));
    } catch (error) {
      toast.error(error.response?.data?.error || "فشل الإعجاب بالرسالة");
    }
  };
}

export function editMessage(id, text) {
  return async (dispatch, getState) => {
    try {
      // التحقق من أن النص غير فارغ
      if (!text || text.trim() === "") {
        toast.error("النص لا يمكن أن يكون فارغاً");
        throw new Error("النص فارغ");
      }

      // يمكننا إضافة تحقق إضافي هنا لو احتاج الأمر
      const res = await server.put(`/messager/edit/${id}`, { text });

      // Update UI immediately
      dispatch(massActions.updateMessageText(res.data));
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "فشل تعديل الرسالة";
      toast.error(errorMessage);
      throw error;
    }
  };
}

export function deleteMessage(id) {
  return async (dispatch) => {
    try {
      await server.delete(`/messager/delete/${id}`);
      // Update UI immediately
      dispatch(massActions.deleteMessage({ messageId: id }));
    } catch (error) {
      toast.error(error.response?.data?.error || "فشل حذف الرسالة");
    }
  };
}

export function createCallRecord(receiverId, callType, callDuration, callStatus) {
  return async (dispatch) => {
    try {
      const res = await server.post('/messager/call-record', {
        receiverId,
        callType,
        callDuration,
        callStatus
      });
      // The call record will be added via socket event
      return res.data;
    } catch (error) {
      console.error("فشل إنشاء سجل المكالمة:", error);
    }
  };
}