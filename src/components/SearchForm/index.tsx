import { useForm } from "react-hook-form";
import { SearchFormContainer } from "./style";

import { MagnifyingGlass } from "phosphor-react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionContext } from "../../contexts/TransactionsContext";

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export const SearchForm = () => {
  const { loadTransactions } = useContext(TransactionContext);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  const handleSearchTransactions = async (data: SearchFormInputs) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    await loadTransactions(data.query);
    console.log(data);
  };

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register("query")}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass />
        Buscar
      </button>
    </SearchFormContainer>
  );
};
