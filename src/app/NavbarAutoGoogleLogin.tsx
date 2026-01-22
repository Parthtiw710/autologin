"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, useSession, signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

export default function NavbarAutoGoogleLogin() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      const timer = setTimeout(() => {
        signIn("google", { callbackUrl: window.location.pathname });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <nav className="sticky top-0 z-50 w-full h-[10vh] backdrop-blur bg-green-700/70">
      <div className="max-w-7xl mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="flex items-center gap-4 text-white text-xl font-bold font-mono">
            Inventory
          </Link>
          <div className="hidden md:flex items-center gap-4">

            {session?.user?.image && (
              <div className="flex items-center gap-1">
                <img src={session.user.image} className="w-8 h-8 rounded-full border border-white" referrerPolicy="no-referrer" />
                <button onClick={() => signOut({ callbackUrl: window.location.href })} className="p-1">
                  <LogOut size={14} />
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}
