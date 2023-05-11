import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";

import {
  TransactionsContainer,
  TransactionsTable,
  PriceHighLight,
} from "./style";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

export const Transactions = () => {
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
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          {loadContent ? (
            <>
              <p>Carregando...</p>
            </>
          ) : (
            <>
              <tbody>
                {transactions.map((value) => {
                  return (
                    <tr key={value.id}>
                      <td width="50%"> {value.description} </td>
                      <td>
                        <PriceHighLight variant={value.type}>
                          {value.price}
                        </PriceHighLight>
                      </td>
                      <td>{value.category}</td>
                      <td>{value.createdAt}</td>
                    </tr>
                  );
                })}

                {/* <tr>
              <td width="50%"> Hamburguer </td>
              <td>
                <PriceHighLight variant="outcome">- R$ 40,00</PriceHighLight>{" "}
              </td>
              <td>Alimentação</td>
              <td>05/05/2023</td>
            </tr> */}
              </tbody>
            </>
          )}
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
};
