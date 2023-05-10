import * as Dialog from "@radix-ui/react-dialog";
import { X, ArrowCircleUp, ArrowCircleDown } from "phosphor-react";

import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransctionTypeButton,
} from "./style";

export const NewTransactionModal = () => {
  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form action="">
          <input type="text" placeholder="Descrição" required />
          <input type="text" placeholder="Descrição" required />
          <input type="text" placeholder="Descrição" required />

          <TransactionType>
            <TransctionTypeButton variant="income" value="income">
              <ArrowCircleUp size={24} />
              Entrada
            </TransctionTypeButton>

            <TransctionTypeButton variant="outcome" value="outcome">
              <ArrowCircleDown size={24} />
              Saída
            </TransctionTypeButton>
          </TransactionType>

          <button type="submit">Cadastrar</button>
        </form>
      </Content>
    </Dialog.Portal>
  );
};
