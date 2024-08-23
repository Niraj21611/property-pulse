const { getServerSession } = require("next-auth");
const { authOptions } = require("./authOptions");

export async function useCurrentSession() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return null;
    }

    return {
      user: session.user,
      userId: session.user.id,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

