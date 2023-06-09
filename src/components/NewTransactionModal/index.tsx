import * as Dialog from "@radix-ui/react-dialog";
import { X, ArrowCircleUp, ArrowCircleDown } from "phosphor-react";

import { Controller, useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useContext } from "react";
import { TransactionContext } from "../../contexts/TransactionsContext";

import { useContextSelector } from "use-context-selector";

import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransctionTypeButton,
} from "./style";

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(["income", "outcome"]),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export const NewTransactionModal = () => {
  const createTransaction = useContextSelector(
    TransactionContext,
    (context) => {
      return context.createTransaction;
    }
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: "income",
    },
  });

  const handleCreateNewTransaction = async (data: NewTransactionFormInputs) => {
    const { description, price, category, type } = data;

    await new Promise((resolve) => setTimeout(resolve, 2000));

    await createTransaction({
      description,
      type,
      category,
      price,
    });

    reset();
  };

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register("description")}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register("price", { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register("category")}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              // console.log(field);

              return (
                <TransactionType
                  // onValueChange={() => {
                  //   field.onChange;
                  //   // console.log();
                  // }}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransctionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransctionTypeButton>

                  <TransctionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransctionTypeButton>
                </TransactionType>
              );
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
};
