"use client";

import { cn } from "@/lib/utils";
import React from "react";

const items = [
  { name: "Naan", qty: 1 },
  { name: "Chapati", qty: 1 },
  { name: "Biryani", qty: 2 },
  { name: "Raita", qty: 1 },
  { name: "Kebab", qty: 3 },
  { name: "Water Bottle", qty: 2 },
  { name: "Coke", qty: 1 },
  { name: "Salad", qty: 1 },
  { name: "Paratha", qty: 2 },
  { name: "Dessert", qty: 1 },
];

const GenerateReceipt: React.FC = () => {
  const printReceipt = () => {
    const receiptContent = `
Token: 123
Invoice: 123
Date: 24-May-2025    Time: 5:20 PM
--------------------------------
Description               Qty
--------------------------------
${items.map((i) => `${i.name.padEnd(24)}${i.qty}`).join("\n")}
--------------------------------
Thank you!`;

    const win = window.open("", "PRINT", "width=400,height=600");

    if (win) {
      win.document.write(`
        <html>
        <head>
          <style>
            body {
              font-family: monospace;
              font-size: 12px;
              padding: 10px;
              white-space: pre;
              width: 72mm;
              margin: 0;
            }
          </style>
        </head>
        <body>${receiptContent}</body>
        </html>
      `);
      win.document.close();
      win.focus();
      win.print();
      win.close();
    }
  };

  return (
    <div>
      <button
        onClick={printReceipt}
        className={cn(
          "rounded-md cursor-pointer border border-slate-200 bg-transparent text-black p-2 h-9 flex whitespace-normal min-w-auto text-nowrap items-center gap-x-2 px-3 transition-colors duration-200 hover:bg-slate-100 hover:border-slate-300 hover:text-slate-900"
        )}
      >
        Print Receipt
      </button>
    </div>
  );
};

export default GenerateReceipt;
