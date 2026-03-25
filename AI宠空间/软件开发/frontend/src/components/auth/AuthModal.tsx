"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { UserCheck, ShieldCheck, X } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: "login" | "register";
  onSuccess: (user: { name: string }) => void;
}

export function AuthModal({ isOpen, onClose, initialMode, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    setMode(initialMode);
    setStatus(null);
  }, [initialMode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "register" && password !== confirmPassword) {
      setStatus("两次输入的密码不一致");
      return;
    }

    setLoading(true);
    setStatus("正在处理中...");

    setTimeout(() => {
      const userData = { name: account };
      localStorage.setItem("ai_pet_current_user_v1", JSON.stringify(userData));
      setLoading(false);
      onSuccess(userData);
      onClose();
    }, 800);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} showHeader={false} className="max-w-md p-0 overflow-hidden">
      <div className="p-6 relative bg-surface-1 border border-border rounded-3">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-text-3 hover:text-text-1 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-400/20 flex items-center justify-center text-emerald-300 text-xl">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-text-1">
              {mode === "login" ? "登录账号" : "注册新账号"}
            </h2>
            <p className="text-xs text-text-3">商用级安全账户中心</p>
          </div>
        </div>

        <div className="flex p-1 bg-surface-2 rounded-xl mb-6">
          <button 
            onClick={() => setMode("login")}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              mode === "login" 
                ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 shadow-sm" 
                : "text-text-3 hover:text-text-2"
            }`}
          >
            登录
          </button>
          <button 
            onClick={() => setMode("register")}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              mode === "register" 
                ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 shadow-sm" 
                : "text-text-3 hover:text-text-2"
            }`}
          >
            注册
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            label="手机号 / 账号" 
            placeholder="输入手机号或用户名" 
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            required 
          />
          <Input 
            label="登录密码" 
            type="password" 
            placeholder="输入您的密码" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          
          {mode === "register" && (
            <Input 
              label="确认密码" 
              type="password" 
              placeholder="再次输入密码" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />
          )}

          <div className="flex items-center justify-between text-xs py-1">
            <label className="flex items-center gap-2 text-text-3 cursor-pointer">
              <input type="checkbox" className="rounded border-border bg-surface-2 text-emerald-500 focus:ring-emerald-500" />
              记住登录状态
            </label>
            <button type="button" className="text-emerald-400 hover:underline">忘记密码？</button>
          </div>

          <Button type="submit" isLoading={loading} className="w-full mt-2 bg-emerald-500 text-slate-900 hover:bg-emerald-400">
            {mode === "login" ? "立即登录" : "注册并登录"}
          </Button>

          {status && (
            <p className={`text-center text-xs mt-4 ${status.includes("失败") || status.includes("不一致") ? "text-danger-500" : "text-text-3"}`}>
              {status}
            </p>
          )}
          
          <p className="text-center text-[10px] text-text-3 mt-4 px-6">
            登录即代表您同意我们的 <span className="text-emerald-400 cursor-pointer">服务协议</span> 和 <span className="text-emerald-400 cursor-pointer">隐私政策</span>
          </p>
        </form>
      </div>
    </Modal>
  );
}
