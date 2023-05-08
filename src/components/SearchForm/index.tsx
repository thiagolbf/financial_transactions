import { SearchFormContainer } from "./style";

import { MagnifyingGlass } from "phosphor-react";

export const SearchForm = () => {
  return (
    <SearchFormContainer>
      <input type="text" placeholder="Busque por transações" />

      <button type="submit">
        <MagnifyingGlass />
        Buscar
      </button>
    </SearchFormContainer>
  );
};
