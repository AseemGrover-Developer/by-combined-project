import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // you can log or modify request here if needed
  },
  {
    callbacks: {
      // ✅ Allow if token exists (means user is logged in)
      authorized: ({ token }) => !!token,
    },
  }
);

// ✅ Protect all admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
