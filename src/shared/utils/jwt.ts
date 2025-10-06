import { type AccessRole } from "@/shared/config/access";
import { getRole } from "@/shared/utils/api";

interface IAccessJWT {
  headers: {
    alg: string;
    typ: string;
  };
  payload: {
    user_id: string;
    role_id: number;
    exp: number;
  };
}

interface IAccessJWTResponse {
  headers: {
    alg: string;
    typ: string;
  };
  payload: {
    userId: string;
    role: AccessRole;
    exp: number;
  };
}

export const parseAccessJWT = (
  accessToken?: string,
): IAccessJWTResponse | null => {
  if (!accessToken) return null;

  try {
    const [h, p] = accessToken.split(".");

    const headers: IAccessJWT["headers"] = JSON.parse(atob(h));
    const payload: IAccessJWT["payload"] = JSON.parse(atob(p));

    const { user_id, role_id, exp } = payload;

    return {
      headers,
      payload: {
        userId: user_id,
        role: getRole(role_id),
        exp,
      },
    };
  } catch {
    return null;
  }
};
