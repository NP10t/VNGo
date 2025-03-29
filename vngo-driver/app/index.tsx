import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";

const Page = () => {
  const { authState } = useAuth();

  if (authState?.authenticated) return <Redirect href="/(home)/(booking)" />;

  return <Redirect href="/(auth)" />;
};

export default Page;
