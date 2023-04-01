import React from "react";

import { AiOutlineSearch } from "react-icons/ai";

import {
  ChatSearchIcon,
  ChatSearchInput,
} from "../../molecules/chat/styles";

interface Props {
  setSearch: Function;
}

const chat_search: React.FC<Props> = ({ setSearch }) => {
  return (
    <div className="px-3 py-3 sticky top-0 bg-gray-100 border-bt-1">
      <div className="relative text-gray-600">
        <ChatSearchIcon>
          <AiOutlineSearch />
        </ChatSearchIcon>
        <ChatSearchInput
          type="search"
          onChange={(e) => setSearch(e.target.value)}
          name="search"
          placeholder="Procurar"
          required
        />
      </div>
    </div>
  );
};

export default chat_search;
