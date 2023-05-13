import { ReactNode, createContext } from "react";
import { useEffect, useState } from "react";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  loadContent: boolean;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionContext = createContext<TransactionContextType>(
  {} as TransactionContextType
);

export function TransctionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loadContent, setLoadContent] = useState(true);

  const loadTransactions = async () => {
    const response = await fetch("http://localhost:3000/transactions");
    const data = await response.json();

    console.log(data);
    setTransactions(data);
    setLoadContent(false);
  };
  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions, loadContent }}>
      {" "}
      {children}
    </TransactionContext.Provider>
  );
}
