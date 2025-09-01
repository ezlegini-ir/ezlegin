import { auth } from "@ezlegin/auth";

const page = async () => {
  const loggedInSession = await auth();
  console.log(loggedInSession);

  return <div></div>;
};

export default page;
