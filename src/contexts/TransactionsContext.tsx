import { ReactNode, createContext } from "react";
import { useEffect, useState } from "react";

import { api } from "../services/axios";

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
  loadTransactions: (query?: string) => Promise<void>;
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

  const loadTransactions = async (query?: string) => {
    //With fetch, code below

    // const url = new URL("http://localhost:3000/transactions");

    // if (query) {
    //   url.searchParams.append("q", query);
    // }

    // const response = await fetch(url);
    // const data = await response.json();

    // console.log(data);

    const response = await api.get("/transactions", {
      params: {
        q: query,
      },
    });

    setTransactions(response.data);
    setLoadContent(false);
  };
  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{ transactions, loadContent, loadTransactions }}
    >
      {" "}
      {children}
    </TransactionContext.Provider>
  );
}
