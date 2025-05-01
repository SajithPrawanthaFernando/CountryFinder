import React from "react";

export const StatCard = ({ icon: Icon, label, value }) => (
  <div className="bg-card border border-muted rounded-lg p-4 flex items-center gap-4 hover:shadow-lg hover:border-primary transition duration-200">
    <Icon className="text-primary w-6 h-6 shrink-0" />
    <div>
      <p className="text-xs text-muted">{label}</p>
      <p className="text-sm font-semibold text-text">{value}</p>
    </div>
  </div>
);
