import { useAuth } from "@/view-model/AuthContext";
import { Redirect } from "expo-router";

const Page = () => {
  const { authState } = useAuth();

  if (authState?.authenticated) return <Redirect href="/home" />;

  return <Redirect href="/login" />;
};

export default Page;
