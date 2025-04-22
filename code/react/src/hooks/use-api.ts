import ky from "ky";
import useEasyAuth from "./use-easy-auth";

const useApi = () => {
  const { authContext } = useEasyAuth();

  const api = ky.extend({
    hooks: {
      beforeRequest: [
        (request) => {
          if (authContext.user) {
            request.headers.set(
              "Authorization",
              `Bearer ${authContext.user?.access_token}`
            );
          }
        },
      ],
    },
  });

  return api;
};

export default useApi;
