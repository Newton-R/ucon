import { supabase } from "@/constants/utils";
import { AuthError, Session, User } from "@supabase/supabase-js";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import React, { createContext, useState } from "react";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  error: AuthError | null;
  loading: boolean;
  signUp: (email: string, password: string, full_name: string) => void;
  logIn: (email: string, password: string) => void;
  InitiatePasswordReset: (email: string) => void;
  resetPassword: (new_password: string) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  error: null,
  loading: true,
  signUp: () => {},
  InitiatePasswordReset: () => {},
  logIn: () => {},
  resetPassword: () => {},
  signOut: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<AuthError | null>(null);
  const redirectUrl = Linking.createURL("/dashboard");

  const router = useRouter();

  const signUp = async (email: string, password: string, full_name: string) => {
    setLoading(true);
    setError(null);

    try {
      console.log("Started signup");
      console.log(redirectUrl);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name,
          },
        },
      });

      console.log("Signup complete");

      if (error) {
        setError(error);
        console.log({ error });
        return;
      }

      if (data.session) {
        setUser(data.user);
        setSession(data.session);
        console.log({ session: data.session });
        router.replace("/dashboard");
      }
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const logIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        setError(error);
        return;
      }
      if (data.session) {
        setSession(data.session);
        setUser(data.user);
        console.log(data);
        router.replace("/dashboard");
      }
    } catch (e) {
      console.log({ error: e });
    } finally {
      setLoading(false);
    }
  };

  const InitiatePasswordReset = async (email: string) => {
    const data = await supabase.auth.resetPasswordForEmail(email);
    if (data.data && !data.error) {
      router.replace("/reset_password");
    }
  };

  const resetPassword = async (new_password: string) => {
    const data = await supabase.auth.updateUser({ password: new_password });
    if (data.data && !data.error) {
      router.replace("/login");
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setError(error);
      } else {
        setSession(null);
        (setUser(null), router.push("/login"));
      }
    } catch (error) {
      console.log({ error: error });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        session,
        user,
        signUp,
        error,
        logIn,
        InitiatePasswordReset,
        resetPassword,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
