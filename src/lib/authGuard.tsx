// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/lib/authContext"; // Your custom hook for authentication

// interface AuthGuardProps {
//   children: React.ReactNode;
// }

// const AuthGuard = ({ children }: AuthGuardProps) => {
//   const { user, loading } = useAuth(); // Fetch user state from context or API
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && !user) {
//       router.replace("/auth/login"); // Redirect if not authenticated
//     }
//   }, [user, loading, router]);

//   if (loading) {
//     return <div>Loading...</div>; // Show a loading state while checking auth
//   }

//   return <>{children}</>;
// };

// export default AuthGuard;