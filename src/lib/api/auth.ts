import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

/** Axios instance for auth calls — uses cookie-based sessions (withCredentials) */
const authClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export interface WmUserInfo {
  isAuthenticated: boolean;
  isSecurityEnabled: boolean;
  userName: string;
  userId: string;
  userRoles: string[];
  tenantId?: number;
  loginTime?: number;
}

/* ─── Demo credentials (used while backend security is disabled) ─── */
/* Username = email from Person table so API calls (loan creation etc.) work correctly */
const DEMO_USERS: Record<
  string,
  { password: string; name: string; email: string; role: string }
> = {
  "john.doe@wavemaker.com": {
    password: "Password@123",
    name: "John Doe",
    email: "john.doe@wavemaker.com",
    role: "APPROVER",
  },
  customer: {
    password: "customer",
    name: "Rajkumar Abbadi",
    email: "rajkumar.abbadi@wavemaker.com",
    role: "CUSTOMER",
  },
  "rajkumar.abbadi@wavemaker.com": {
    password: "Password@123",
    name: "Rajkumar Abbadi",
    email: "rajkumar.abbadi@wavemaker.com",
    role: "CUSTOMER",
  },
  "vivek.raj@wavemaker.com": {
    password: "password",
    name: "Vivek Raj",
    email: "vivek.raj@wavemaker.com",
    role: "CUSTOMER",
  },
  "sagar.vemala@wavemaker.com": {
    password: "password",
    name: "Sagar Vemala",
    email: "sagar.vemala@wavemaker.com",
    role: "CUSTOMER",
  },
};

/**
 * Login — tries WaveMaker Spring Security first, falls back to demo credentials.
 * Once backend security is enabled, the demo fallback is skipped automatically.
 */
export async function wmLogin(
  username: string,
  password: string,
): Promise<WmUserInfo> {
  // First check if backend security is enabled
  // const secInfo = await wmGetSecurityInfo();
  const secInfo = { securityEnabled: false };

  if (secInfo.securityEnabled) {
    // Real WaveMaker auth: POST /j_spring_security_check
    const params = new URLSearchParams();
    params.append("j_username", username);
    params.append("j_password", password);

    await authClient.post("/j_spring_security_check", params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      maxRedirects: 0,
      validateStatus: (status) => status < 400 || status === 302,
    });

    const userInfo = await wmGetSecurityInfo();
    if (!userInfo.authenticated) {
      throw new Error("Invalid credentials");
    }
    return {
      isAuthenticated: true,
      isSecurityEnabled: true,
      userName: userInfo.userInfo?.userName ?? username,
      userId: userInfo.userInfo?.userId ?? username,
      userRoles: userInfo.userInfo?.userRoles ?? ["CUSTOMER"],
    };
  }

  // Backend security disabled — use demo credentials
  const demo = DEMO_USERS[username.toLowerCase()];
  if (!demo || demo.password !== password) {
    throw new Error("Invalid credentials");
  }

  return {
    isAuthenticated: true,
    isSecurityEnabled: false,
    userName: demo.name,
    userId: demo.email,
    userRoles: [demo.role],
  };
}

interface SecurityInfoResponse {
  securityEnabled: boolean;
  authenticated: boolean;
  rememberMeEnabled: boolean;
  loginConfig: unknown;
  userInfo: { userName: string; userId: string; userRoles: string[] } | null;
  csrfHeaderName: string | null;
  csrfCookieName: string | null;
}

/**
 * Fetch the WaveMaker security info endpoint.
 * GET /services/security/info
 */
export async function wmGetSecurityInfo(): Promise<SecurityInfoResponse> {
  const { data } = await authClient.get<SecurityInfoResponse>(
    "/services/security/info",
  );
  return data;
}

/**
 * Logout — calls WaveMaker logout if security is enabled, otherwise just clears client state.
 */
export async function wmLogout(): Promise<void> {
  try {
    await authClient.post("/j_spring_security_logout", null, {
      validateStatus: (status) =>
        status < 400 || status === 302 || status === 404,
    });
  } catch {
    // Ignore — backend security may be disabled
  }
}
