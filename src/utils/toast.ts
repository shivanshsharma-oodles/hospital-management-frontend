import {toast} from "react-hot-toast";
import type { ToastFunction } from "@/types";

export const showSuccess : ToastFunction = (msg, id) => toast.success(msg, { id });
export const showError : ToastFunction = (msg, id) => toast.error(msg, { id });
export const showInfo : ToastFunction = (msg, id) => toast(msg, { id });