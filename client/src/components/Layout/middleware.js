import cookie from "cookie";

export function ProtectedPage(gssp) {
  return async (ctx) => {
    const { req } = ctx;
    // return await gssp(ctx);

    const hCookie = req.headers.cookie;

    if (hCookie) {
      const { refreshToken, accessToken } = cookie.parse(hCookie);

      if (refreshToken || accessToken) {
        return await gssp(ctx);
      } else {
        return {
          redirect: {
            permanent: false,
            destination: "/login",
          },
        };
      }
    } else {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }
  };
}

export function LoginPage(gssp) {
  return async (ctx) => {
    const { req } = ctx;
    // return await gssp(ctx);

    const hCookie = req.headers.cookie;

    if (hCookie) {
      const { accessToken, refreshToken } = cookie.parse(hCookie);

      if (accessToken || refreshToken) {
        return {
          redirect: {
            permanent: false,
            destination: "/",
          },
        };
      } else {
        return await gssp(ctx);
      }
    } else {
      return await gssp(ctx);
    }
  };
}
