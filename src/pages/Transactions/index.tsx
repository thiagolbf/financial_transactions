import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";

import {
  TransactionsContainer,
  TransactionsTable,
  PriceHighLight,
} from "./style";

export const Transactions = () => {
  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <TransactionsTable>
          <tbody>
            <tr>
              <td width="50%"> Desenvolvimento de site </td>
              <td>
                <PriceHighLight variant="income">R$ 12.000,00</PriceHighLight>
              </td>
              <td>Venda</td>
              <td>05/05/2023</td>
            </tr>
            <tr>
              <td width="50%"> Hamburguer </td>
              <td>
                <PriceHighLight variant="outcome">- R$ 40,00</PriceHighLight>{" "}
              </td>
              <td>Alimentação</td>
              <td>05/05/2023</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
};
