import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Box, InputBase } from "@mui/material";
import styled from "@emotion/styled";
import FilterListIcon from "@mui/icons-material/FilterList";

const Component = styled(Box)`
  background: #fff;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center; /* Center horizontally */
  border-bottom: 1px solid #f2f2f2;
`;

const Wrapper = styled(Box)`
  //   position: relative;
  background: #f0f2f5;
  display: flex;
  margin: 0px 12px;
  border-radius: 5px;
  padding: 5px;
  width: 47%;
  //   height: 100%;
`;

const IconWrapper = styled(Box)`
  position: absolute;
  height: 100%;
  padding-left: 10px;
  color: #919191;
`;

const SearchBox = styled(InputBase)`
  width: 100%;
  padding: 10px;
  height: 15px;
  padding-left: 65px;
`;

function Search({ settext }) {
  return (
    <>
      <Component>
        <Wrapper>
          <IconWrapper>
            <SearchIcon fontSize="small" />
          </IconWrapper>
          <SearchBox
            placeholder="Search User"
            onChange={(e) => settext(e.target.value)}
          />
        </Wrapper>
      </Component>
    </>
  );
}

export default Search;
