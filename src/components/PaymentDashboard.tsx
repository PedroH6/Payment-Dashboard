import { useState } from "react";
import {
  type Payment,
  type PaymentStatus,
  initialPayments,
} from "@/types/payment";

import { Search, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function PaymentDashboard() {
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [selectedTab, setSelectedTab] = useState<
    "all" | "paid" | "unpaid" | "overdue"
  >("all");
  const [SearchQuery, setSearchQuery] = useState("");
  const [selectedPayments, setSelectedTabPayments] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isAddPayment, setIsAddPaymentOpen] = useState(false);
  const [newPayment, setNewPayment] = useState<Partial<Payment>>({
    name: "",
    email: "",
    userStatus: "Active",
    paymentStatus: "Unpaid",
    amount: 0,
  });

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounde-lg shadow">
        <div className="p-6">
          <h1 className="text-xl font-semibold mb-4">Table Heading</h1>

          {/* Tabs */}
          <div className="border-b">
            <Tabs defaultValue="all">
              <TabsList className="bg-transparent border-b">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
                >
                  ALL
                </TabsTrigger>
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
                >
                  Paid
                </TabsTrigger>
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
                >
                  Unpaid
                </TabsTrigger>
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
                >
                  Overdue
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Tatal amount */}
          <div className="text-right mt-4">
            <p className="text-sm text-gray-500">Total payable amount</p>
            <p className="text-lg font-semibold">100,00</p>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex justify-between items-center mt-6 mb-4">
            <div className="relative w-1/3">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Seach Users by Name, Email or Date"
                className="pl-10"
              />
              <Button className="absolute inset-y-0 right-0 flex items-center pr-3">
                <X className="h-4 w-4 text-gray-400" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
