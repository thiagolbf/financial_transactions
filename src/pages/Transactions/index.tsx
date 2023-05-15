import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";

import { useContext } from "react";
import { TransactionContext } from "../../contexts/TransactionsContext";

import {
  TransactionsContainer,
  TransactionsTable,
  PriceHighLight,
} from "./style";

import { dateFormatter, priceFormatter } from "../../utils/formatter";

export const Transactions = () => {
  const { loadContent, transactions } = useContext(TransactionContext);

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
                          {value.type === "outcome" && "- "}
                          {priceFormatter.format(value.price)}
                        </PriceHighLight>
                      </td>
                      <td>{value.category}</td>
                      <td>{dateFormatter.format(new Date(value.createdAt))}</td>
                    </tr>
                  );
                })}
              </tbody>
            </>
          )}
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
};
