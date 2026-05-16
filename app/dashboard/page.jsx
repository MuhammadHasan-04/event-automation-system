"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");
  const topRef = useRef(null);

  const fetchEvents = async () => {
    const res = await fetch("/api/events/list");
    const data = await res.json();
    setEvents(data.data || []);
  };

  useEffect(() => {
    fetchEvents();

    const channel = supabase
      .channel("events-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "events",
        },
        (payload) => {
          const newEvent = payload.new;

          setEvents((prev) => [newEvent, ...prev]);

          setTimeout(() => {
            topRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 100);

          if (newEvent.priority === "high") {
            toast.error(`🚨 HIGH: ${newEvent.intent}`);
          } else {
            toast.success(`New: ${newEvent.intent}`);
          }
        },
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const filteredEvents = events.filter((e) => {
    if (filter === "all") return true;
    return e.priority === filter;
  });

  const count = {
    all: events.length,
    high: events.filter((e) => e.priority === "high").length,
    low: events.filter((e) => e.priority === "low").length,
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white">
      <div className="sticky top-0 z-10 bg-[#0b0f19]/80 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">
            AI Event Dashboard
          </h1>

          <div className="text-xs text-gray-400">Live Event System</div>
        </div>

        <div className="max-w-6xl mx-auto px-6 pb-4 flex gap-2">
          {[
            { key: "all", label: "All" },
            { key: "high", label: "High" },
            { key: "low", label: "Low" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              className={`px-4 py-1.5 rounded-full text-sm border transition ${
                filter === t.key
                  ? "bg-white text-black"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        <div ref={topRef} />

        {filteredEvents.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">No events yet</div>
        ) : (
          <div className="grid gap-4">
            {filteredEvents.map((e, i) => (
              <div
                key={i}
                className="group bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-200 hover:-translate-y-1"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-white">
                    {e.intent}
                  </h3>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      e.priority === "high"
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                    }`}
                  >
                    {e.priority.toUpperCase()}
                  </span>
                </div>

                <p className="text-sm text-gray-300 mt-2">
                  Action:{" "}
                  <span className="text-white font-medium">{e.action}</span>
                </p>

                <div className="mt-3 p-3 bg-black/30 border border-white/10 rounded-lg text-sm text-gray-200">
                  {e.message}
                </div>

                <div className="mt-3 text-xs text-gray-500 flex justify-between">
                  <span>Status: {e.status || "pending"}</span>
                  <span># {i + 1}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
