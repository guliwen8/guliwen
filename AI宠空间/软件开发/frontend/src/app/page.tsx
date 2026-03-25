"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { PawPrint, Calendar, Plus, Clock, ChevronRight } from "lucide-react";
import { bookingApi } from "@/lib/api";

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, bookingsRes] = await Promise.all([
          bookingApi.getServices(),
          bookingApi.getMyBookings(),
        ]);
        setServices(servicesRes.data.data);
        setBookings(bookingsRes.data.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="px-4 pt-12 pb-8 md:pt-24 md:pb-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h1 className="text-xl md:text-3xl font-bold text-text-1 leading-tight mb-4">
              给您的爱宠 <span className="text-primary-500">AI 级</span> 的全方位呵护
            </h1>
            <p className="text-md text-text-2 mb-8">
              专业、高效、高频低价，让每一次宠护都成为享受。
            </p>
            <div className="flex gap-4">
              <Button size="lg" onClick={() => setIsBookingOpen(true)}>
                立即预约
              </Button>
              <Button size="lg" variant="outline">
                了解更多
              </Button>
            </div>
          </div>
          <div className="hidden md:block relative w-full max-w-md aspect-square bg-primary-500/10 rounded-3 overflow-hidden border border-primary-500/20">
             {/* Placeholder for Hero Image */}
             <div className="absolute inset-0 flex items-center justify-center">
               <PawPrint size={120} className="text-primary-500/20" />
             </div>
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="px-4 py-8 max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: <Plus className="text-accent-500" />, label: "新增宠物" },
          { icon: <Calendar className="text-primary-500" />, label: "预约服务" },
          { icon: <Clock className="text-warning-500" />, label: "我的订单" },
          { icon: <Plus className="text-text-3" />, label: "更多服务" },
        ].map((item, idx) => (
          <Card key={idx} className="p-4 flex flex-col items-center justify-center gap-2 hover:bg-surface-2 transition-colors cursor-pointer border-dashed">
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </Card>
        ))}
      </section>

      {/* My Bookings */}
      <section className="px-4 py-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">我的预约记录</h2>
          <Button variant="ghost" size="sm" className="text-text-3 hover:text-text-1">
            全部记录 <ChevronRight size={16} />
          </Button>
        </div>
        
        <div className="space-y-4">
          {bookings.length > 0 ? (
            bookings.map((booking: any) => (
              <Card key={booking.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2 bg-surface-2 flex items-center justify-center">
                    <PawPrint className="text-text-3" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{booking.service_name}</h3>
                    <p className="text-xs text-text-3 mt-1">
                      {booking.pet_name} · {booking.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={cn(
                    "text-xs px-2 py-1 rounded-pill mb-1",
                    booking.status === 'pending' ? 'bg-warning-500/10 text-warning-500' :
                    booking.status === 'completed' ? 'bg-primary-500/10 text-primary-500' :
                    'bg-surface-3 text-text-3'
                  )}>
                    {booking.status_label}
                  </div>
                  <p className="text-sm font-bold">¥{booking.price}</p>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
               <p className="text-text-3 italic">暂无预约记录</p>
            </div>
          )}
        </div>
      </section>

      {/* Booking Modal */}
      <Modal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)}
        title="快速预约服务"
      >
        <div className="space-y-6">
          <Input label="宠物昵称" placeholder="例如：大白" />
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-2">选择服务</label>
            <div className="grid grid-cols-2 gap-3">
              {services.map((s: any) => (
                <div key={s.id} className="p-3 rounded-2 border border-border bg-surface-2 hover:border-primary-500 cursor-pointer transition-all">
                  <p className="text-sm font-bold">{s.name}</p>
                  <p className="text-xs text-text-3 mt-1">¥{s.price}起</p>
                </div>
              ))}
            </div>
          </div>
          <Button className="w-full">提交预约 (¥0.00)</Button>
        </div>
      </Modal>
    </main>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
