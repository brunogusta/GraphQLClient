import React from 'react';

import {
  Container,
  SearchButton,
  TableContainer,
  Table,
  ButtonContainer
} from './styles';

export default function List() {
  return (
    <Container>
      <ButtonContainer>
        <SearchButton>OBTER USUÁRIOS</SearchButton>
      </ButtonContainer>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Label</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>João</td>
              <td>teste@gmail.com</td>
            </tr>
            <tr>
              <td>1</td>
              <td>João</td>
              <td>teste@gmail.com</td>
            </tr>
            <tr>
              <td>1</td>
              <td>João</td>
              <td>teste@gmail.com</td>
            </tr>
            <tr>
              <td>1</td>
              <td>João</td>
              <td>teste@gmail.com</td>
            </tr>
            <tr>
              <td>1</td>
              <td>João</td>
              <td>teste@gmail.com</td>
            </tr>
            <tr>
              <td>1</td>
              <td>João</td>
              <td>teste@gmail.com</td>
            </tr>
            <tr>
              <td>1</td>
              <td>João</td>
              <td>teste@gmail.com</td>
            </tr>
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}
