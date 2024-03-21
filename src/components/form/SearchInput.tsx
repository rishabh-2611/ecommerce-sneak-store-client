import { Input, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

interface SearchInputProps {
    w?: number;
    placeholder: string;
}

const SearchInput = ({ w, placeholder }:SearchInputProps) => {
  const width = w || 300;
  return (
    <Input
      w={width}
      placeholder={placeholder}
      leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
      visibleFrom="xs"
    />
  );
};

export default SearchInput;
