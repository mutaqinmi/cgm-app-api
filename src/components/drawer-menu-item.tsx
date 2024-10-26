"use client";
import { User } from "@phosphor-icons/react";

export default function DrawerMenuItem() {
    return (
      <div className="flex items-center h-8 cursor-pointer">
        <div>
          <User className="w-6 h-6 mr-6" />
        </div>
        <div>
          <span className="text-base">Tentang Saya</span>
        </div>
      </div>
    );
  }