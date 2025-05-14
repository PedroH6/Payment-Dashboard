import { useEffect, useState } from "react";
import {
  type Payment,
  type PaymentStatus,
  initialPayments,
} from "@/types/payment";

import { Search, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { formatCurrency } from "@/lib/utils";

export function PaymentDashboard() {
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [selectedTab, setSelectedTab] = useState<
    "all" | "paid" | "unpaid" | "overdue"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
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

  // Filtrar pagamentos com base na guia e na consulta de pesquisa
  const filteredPayments = payments.filter((payment) => {
    if (selectedTab === "paid" && payment.paymentStatus !== "Paid")
      return false;
    if (selectedTab === "unpaid" && payment.paymentStatus !== "Unpaid")
      return false;
    if (selectedTab === "overdue" && payment.paymentStatus !== "Overdue")
      return false;

    // Filtrar por consulta de pesquisa
    if (searchQuery.trim() === "") return true;

    const query = searchQuery.toLowerCase();
    return (
      payment.name.toLowerCase().includes(query) ||
      payment.email.toLowerCase().includes(query) ||
      payment.lastLogin.toLowerCase().includes(query)
    );
  });

  // Valor total a pagar
  const totalPayableAmount = payments.reduce((total, payment) => {
    return total + payment.amount;
  }, 0);

  // Manipular seleção de caixa de seleção
  const toggleSelectPayment = (id: string) => {
    if (selectedPayments.includes(id)) {
      setSelectedTabPayments(
        selectedPayments.filter((paymentId) => paymentId !== id)
      );
    } else {
      setSelectedTabPayments([...selectedPayments, id]);
    }
  };

  // Manipular caixa de seleção de seleção completa
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedTabPayments([]);
    } else {
      setSelectedTabPayments(filteredPayments.map((payment) => payment.id));
    }
    setSelectAll(!selectAll);
  };

  // Redefine a caixa de seleção Selecionar tudo quando os pagamentos filtrados mudam
  useEffect(() => {
    const allSelected =
      filteredPayments.length > 0 &&
      filteredPayments.every((payment) =>
        selectedPayments.includes(payment.id)
      );
    setSelectAll(allSelected);
  }, [filteredPayments, selectedPayments]);

  //Adiciona novo pagamento
  const hadleAddpayment = () => {
    const id = (payments.length + 1).toString();
    const currentDate = new Date().toLocaleDateString("pt-BR");

    const paymentToAdd: Payment = {
      id,
      name: newPayment.name || "New User",
      email: newPayment.email || "example@email.com",
      userStatus: newPayment.userStatus || "Active",
      lastLogin: currentDate,
      paymentStatus: newPayment.paymentStatus || "Unpaid",
      amount: newPayment.amount || 0,
    };

    // Adicione a data de vencimento ou data de pagamento com base no status
    if (paymentToAdd.paymentStatus === "Paid") {
      paymentToAdd.paymentDate = currentDate;
    } else {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 7);
      paymentToAdd.dueDate = dueDate.toLocaleDateString("pt-BR");
    }
    setPayments([...payments, paymentToAdd]);
    setIsAddPaymentOpen(false);
    resetNewPayment();
  };

  //Exclui pagamentos selecionados
  const deleteSelectedPayments = () => {
    setPayments(
      payments.filter((payment) => !selectedPayments.includes(payment.id))
    );
    setSelectedPayments([]);
  };

  // Redefinir novo formulário de pagamento
  const resetNewPayment = () => {
    setNewPayment({
      name: "",
      email: "",
      userStatus: "Active",
      paymentStatus: "Unpaid",
      amount: 0,
    });
  };

  // Obtém a cor do status
  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case "Paid":
        return "text-green-500";
      case "Unpaid":
        return "text-amber=500";
      case "Overdue":
        return "text-red-500";
      default:
        return "";
    }
  };

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
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onVolumeChange={(value) => setSelectedTab(value as any)}
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
            <p className="text-lg font-semibold">
              {formatCurrency(totalPayableAmount)}
            </p>
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
