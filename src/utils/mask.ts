import type { maskValueType } from "@/types";

export const maskValue = (value: maskValueType, visible = 4): string => {
  if (!value) return "";
  const strValue = String(value);
  const prefix = strValue.slice(0, visible);
  return `${prefix}${"*".repeat(Math.max(0, strValue.length - visible))}`;
};

export const maskEmail = (email: string): string => {
  if (!email || !email.includes("@")) return "";
  const [local, domain] = email.split("@");
  return `${local.slice(0, 3)}***@${domain}`;
};