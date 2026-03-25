"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  Search, 
  Filter,
  MoreVertical,
  CheckCircle2,
  Clock,
  XCircle
} from "lucide-react";
import { adminApi } from "@/lib/api";

export default function AdminDashboard() {
  const [kpis, setKpis] = useState<any>(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [kpiRes, bookingsRes] = await Promise.all([
          adminApi.getKpi(),
          adminApi.getBookings({}),
        ]);
        setKpis(kpiRes.data.data);
        setBookings(bookingsRes.data.data);
      } catch (error) {
        console.error("Failed to fetch admin data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const kpiItems = [
    { label: "今日订单", value: kpis?.today_orders || "128", icon: <ShoppingBag />, trend: "+12%" },
    { label: "活跃用户", value: kpis?.active_users || "2,420", icon: <Users />, trend: "+5%" },
    { label: "客单价", value: `¥${kpis?.avg_price || "156"}`, icon: <TrendingUp />, trend: "+8%" },
    { label: "复购率", value: `${kpis?.retention || "42"}%`, icon: <CheckCircle2 />, trend: "+2%" },
  ];

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Sidebar Placeholder */}
      <aside className="hidden lg:flex w-64 border-r border-border flex-col p-6 space-y-8">
        <div className="font-bold text-xl flex items-center gap-2">
          <div className="h-8 w-8 bg-primary-500 rounded-1" />
          PetCare Admin
        </div>
        <nav className="space-y-2">
          {["数据看板", "预约管理", "用户运营", "服务设置"].map((item, i) => (
            <div key={i} className={`p-3 rounded-2 cursor-pointer ${i === 0 ? 'bg-primary-500/10 text-primary-500 font-medium' : 'text-text-3 hover:bg-surface-1 hover:text-text-1'}`}>
              {item}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 space-y-8 overflow-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-text-1">数据看板</h1>
            <p className="text-sm text-text-3">实时监控平台运营核心指标</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Filter size={16} className="mr-2" /> 筛选
            </Button>
            <Button size="sm">导出报表</Button>
          </div>
        </header>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiItems.map((kpi, i) => (
            <Card key={i} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-surface-2 rounded-2 text-primary-500">
                  {kpi.icon}
                </div>
                <span className="text-xs font-medium text-primary-500 bg-primary-500/10 px-2 py-1 rounded-pill">
                  {kpi.trend}
                </span>
              </div>
              <p className="text-sm text-text-3">{kpi.label}</p>
              <h3 className="text-xl font-bold text-text-1 mt-1">{kpi.value}</h3>
            </Card>
          ))}
        </div>

        {/* Bookings Table */}
        <Card className="overflow-hidden">
          <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="font-bold">最近预约单</h2>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-3" size={16} />
              <Input placeholder="搜索手机号/订单号/宠物名..." className="pl-10" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-2/50 text-text-3 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium">订单信息</th>
                  <th className="px-6 py-4 font-medium">宠物 & 用户</th>
                  <th className="px-6 py-4 font-medium">服务项目</th>
                  <th className="px-6 py-4 font-medium">状态</th>
                  <th className="px-6 py-4 font-medium">金额</th>
                  <th className="px-6 py-4 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {bookings.length > 0 ? bookings.map((booking: any) => (
                  <tr key={booking.id} className="hover:bg-surface-1/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-text-1">#{booking.id.slice(0, 8)}</p>
                      <p className="text-xs text-text-3">{booking.created_at}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-text-1">{booking.pet_name}</p>
                      <p className="text-xs text-text-3">{booking.contact_phone}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-text-1">{booking.service_name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-pill text-xs font-medium ${
                        booking.status === 'pending' ? 'bg-warning-500/10 text-warning-500' :
                        booking.status === 'processing' ? 'bg-accent-500/10 text-accent-500' :
                        'bg-primary-500/10 text-primary-500'
                      }`}>
                        {booking.status === 'pending' ? <Clock size={12}/> : 
                         booking.status === 'processing' ? <TrendingUp size={12}/> : 
                         <CheckCircle2 size={12}/>}
                        {booking.status_label}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-text-1">
                      ¥{booking.price}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-text-3 hover:text-text-1">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-text-3 italic">
                      暂无数据
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
}
