"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { PawPrint, LogOut, User } from "lucide-react";
import { AuthModal } from "@/components/auth/AuthModal";

export function Header() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  useEffect(() => {
    const savedUser = localStorage.getItem("ai_pet_current_user_v1");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = () => {
    setAuthMode("login");
    setIsAuthModalOpen(true);
  };

  const handleRegister = () => {
    setAuthMode("register");
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("ai_pet_current_user_v1");
    setUser(null);
  };

  const handleAuthSuccess = (userData: { name: string }) => {
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  return (
    <header className="bg-surface-1/80 backdrop-blur-md border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-400/20 flex items-center justify-center text-emerald-300">
            <PawPrint size={24} />
          </div>
          <div>
            <div className="text-base font-bold md:text-lg text-text-1">AI宠空间</div>
            <div className="text-xs text-text-3">高保真宠护平台</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded-pill border border-emerald-500/20">
                <User size={16} />
                <span>欢迎您，{user.name}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="text-xs text-text-3 hover:text-text-1 underline flex items-center gap-1 transition-colors"
              >
                <LogOut size={14} />
                退出
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogin}
                className="rounded-xl border-border hover:bg-surface-2"
              >
                登录
              </Button>
              <Button 
                size="sm" 
                onClick={handleRegister}
                className="rounded-xl bg-emerald-500 text-slate-900 hover:bg-emerald-400"
              >
                注册
              </Button>
            </div>
          )}
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode}
        onSuccess={handleAuthSuccess}
      />
    </header>
  );
}
