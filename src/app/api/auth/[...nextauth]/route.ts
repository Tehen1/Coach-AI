import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Simple in-memory store for demo purposes
const users: Record<string, any> = {
    "user@example.com": {
        id: "1",
        name: "Fadma",
        email: "user@example.com",
        password: "password123" 
    }
};

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
            return null;
        }
        const user = users[credentials.email];
        if (user && user.password === credentials.password) {
          // Any object returned will be saved in `user` property of the JWT
          return { id: user.id, name: user.name, email: user.email };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
        if(user) {
            token.id = user.id;
        }
      return token;
    },
    async session({ session, token }) {
        if(session.user){
            (session.user as any).id = token.id;
        }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
