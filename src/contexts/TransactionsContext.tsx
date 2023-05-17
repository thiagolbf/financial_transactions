import { ReactNode, createContext } from "react";
import { useEffect, useState } from "react";

import { api } from "../services";

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
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: "income" | "outcome";
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
        _sort: "cretedAt",
        _order: "desc",
        q: query,
      },
    });

    setTransactions(response.data);
    setLoadContent(false);
  };
  useEffect(() => {
    loadTransactions();
  }, []);

  const createTransaction = async (data: CreateTransactionInput) => {
    const { description, price, category, type } = data;

    const response = await api.post("/transactions", {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    });

    setTransactions((state) => [response.data, ...state]);
  };

  return (
    <TransactionContext.Provider
      value={{ transactions, loadContent, loadTransactions, createTransaction }}
    >
      {" "}
      {children}
    </TransactionContext.Provider>
  );
}
