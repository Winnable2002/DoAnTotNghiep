import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";

// Utility để gộp class Tailwind một cách an toàn
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Chuyển enum dạng PascalCase thành chuỗi có dấu cách
export function formatEnumString(str: string) {
  return str.replace(/([A-Z])/g, " $1").trim();
}

// Định dạng giá theo kiểu Min/Max Price
export function formatPriceValue(value: number | null, isMin: boolean) {
  if (value === null || value === 0)
    return isMin ? "Any Min Price" : "Any Max Price";
  if (value >= 1000) {
    const kValue = value / 1000;
    return isMin ? `$${kValue}k+` : `<$${kValue}k`;
  }
  return isMin ? `$${value}+` : `<$${value}`;
}

// Dọn dẹp params khỏi undefined, null, "any", hoặc mảng rỗng/null
export function cleanParams(params: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(params).filter(
      (
        [_, value] // eslint-disable-line @typescript-eslint/no-unused-vars
      ) =>
        value !== undefined &&
        value !== "any" &&
        value !== "" &&
        (Array.isArray(value) ? value.some((v) => v !== null) : value !== null)
    )
  );
}

type MutationMessages = {
  success?: string;
  error: string;
};

// Thực thi promise mutation và toast kết quả
export const withToast = async <T>(
  mutationFn: Promise<T>,
  messages: Partial<MutationMessages>
) => {
  const { success, error } = messages;

  try {
    const result = await mutationFn;
    if (success) toast.success(success);
    return result;
  } catch (err) {
    if (error) toast.error(error);
    throw err;
  }
};

// Hàm tạo mới user trong DB (nếu chưa tồn tại)
export const createNewUserInDatabase = async (
  user: any,
  idToken: any,
  userRole: string,
  fetchWithBQ: any
) => {
  const createEndpoint =
    userRole?.toLowerCase() === "manager" ? "/managers" : "/tenants";

  const body = {
    cognitoId: user.userId,
    name: user.username,
    email: idToken?.payload?.email || "",
    phoneNumber: "",
  };

  // Ghi log để kiểm tra request
  console.log("[createNewUserInDatabase] Sending to:", createEndpoint);
  console.log("[createNewUserInDatabase] Body:", body);

  const createUserResponse = await fetchWithBQ({
    url: createEndpoint,
    method: "POST",
    body,
  });

  // Ghi log response
  if (createUserResponse.error) {
    console.error("[createNewUserInDatabase] Error:", createUserResponse.error);
    throw new Error("Failed to create user record");
  }

  console.log("[createNewUserInDatabase] Success:", createUserResponse.data);

  return createUserResponse;
};
