import { useCurrentQuery } from "../../app/serivices/auth.js";

export const Auth = ({ children }) => {
  const { isLoading } = useCurrentQuery();

  if(isLoading) {
    return <span>Загрузка</span>
  }

  return children
}
