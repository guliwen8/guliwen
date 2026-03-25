"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PawPrint } from "lucide-react";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);

  const toggleMode = () => setMode(mode === "login" ? "register" : "login");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // 模拟 API 调用
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 rounded-2 bg-primary-500 flex items-center justify-center mb-4">
            <PawPrint className="text-[#04120A]" size={28} />
          </div>
          <h1 className="text-xl font-bold text-text-1">
            {mode === "login" ? "欢迎回来" : "创建账户"}
          </h1>
          <p className="text-sm text-text-3 mt-1">
            {mode === "login" ? "使用手机号快速登录" : "开始您的宠护之旅"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <Input label="昵称" placeholder="输入您的昵称" required />
          )}
          <Input label="手机号" placeholder="138 0000 0000" type="tel" required />
          
          {mode === "login" ? (
            <div className="flex gap-2">
              <Input placeholder="6位验证码" className="flex-1" maxLength={6} required />
              <Button type="button" variant="outline" className="shrink-0">
                获取验证码
              </Button>
            </div>
          ) : (
            <>
              <Input label="密码" placeholder="设置登录密码" type="password" required />
              <Input label="首只宠物" placeholder="您的宠物昵称" required />
            </>
          )}

          <Button type="submit" className="w-full mt-6" isLoading={loading}>
            {mode === "login" ? "立即登录" : "提交注册"}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={toggleMode}
            className="text-sm text-text-2 hover:text-primary-500 transition-colors"
          >
            {mode === "login" ? "还没有账户？去注册" : "已有账户？去登录"}
          </button>
        </div>
      </Card>
    </main>
  );
}
